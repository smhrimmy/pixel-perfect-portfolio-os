-- Bootstrap function: grants admin role to the first caller if no admin exists yet.
-- After the first admin is claimed, this becomes a no-op.
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller uuid := auth.uid();
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (caller, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin() TO authenticated;

-- Publish function: atomically copies draft cms_config to live and records a
-- snapshot in theme_history. Runs with definer rights but checks admin role.
CREATE OR REPLACE FUNCTION public.publish_draft(_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller uuid := auth.uid();
  draft record;
  live_before record;
  snap_id uuid;
BEGIN
  IF caller IS NULL OR NOT public.has_role(caller, 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  SELECT website_theme, blog_theme, feature_flags INTO draft
  FROM public.cms_config WHERE state = 'draft';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no draft config';
  END IF;
  SELECT website_theme, blog_theme, feature_flags INTO live_before
  FROM public.cms_config WHERE state = 'live';

  INSERT INTO public.theme_history (snapshot, note, created_by)
  VALUES (
    jsonb_build_object(
      'previous_live', to_jsonb(live_before),
      'new_live', to_jsonb(draft),
      'kind', 'publish'
    ),
    _note,
    caller
  ) RETURNING id INTO snap_id;

  UPDATE public.cms_config
  SET website_theme = draft.website_theme,
      blog_theme = draft.blog_theme,
      feature_flags = draft.feature_flags,
      updated_at = now()
  WHERE state = 'live';

  RETURN jsonb_build_object('snapshot_id', snap_id);
END;
$$;

REVOKE ALL ON FUNCTION public.publish_draft(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_draft(text) TO authenticated;

-- Rollback: apply a prior snapshot's previous_live back onto both draft and live.
CREATE OR REPLACE FUNCTION public.rollback_to(_snapshot_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller uuid := auth.uid();
  snap jsonb;
  target jsonb;
  new_snap_id uuid;
  live_before record;
BEGIN
  IF caller IS NULL OR NOT public.has_role(caller, 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  SELECT snapshot INTO snap FROM public.theme_history WHERE id = _snapshot_id;
  IF snap IS NULL THEN RAISE EXCEPTION 'snapshot not found'; END IF;
  target := COALESCE(snap->'previous_live', snap->'new_live');
  IF target IS NULL THEN RAISE EXCEPTION 'snapshot has no state'; END IF;

  SELECT website_theme, blog_theme, feature_flags INTO live_before
  FROM public.cms_config WHERE state = 'live';

  INSERT INTO public.theme_history (snapshot, note, created_by)
  VALUES (
    jsonb_build_object(
      'previous_live', to_jsonb(live_before),
      'new_live', target,
      'kind', 'rollback',
      'source_snapshot', _snapshot_id
    ),
    'rollback',
    caller
  ) RETURNING id INTO new_snap_id;

  UPDATE public.cms_config
  SET website_theme = COALESCE(target->>'website_theme', website_theme),
      blog_theme = COALESCE(target->>'blog_theme', blog_theme),
      feature_flags = COALESCE(target->'feature_flags', feature_flags),
      updated_at = now()
  WHERE state IN ('live', 'draft');

  RETURN jsonb_build_object('snapshot_id', new_snap_id);
END;
$$;

REVOKE ALL ON FUNCTION public.rollback_to(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.rollback_to(uuid) TO authenticated;