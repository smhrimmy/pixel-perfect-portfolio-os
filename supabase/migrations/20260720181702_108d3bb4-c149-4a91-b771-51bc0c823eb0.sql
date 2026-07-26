
-- 1) has_role: switch to SECURITY INVOKER (users can already read their own user_roles rows via RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- 2) Revoke EXECUTE on all SECURITY DEFINER functions from anon/authenticated/PUBLIC.
--    These will now be called only via the service role from trusted server functions.
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin()        FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.publish_draft(text)             FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rollback_to(uuid)               FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rollback_article(uuid)          FROM PUBLIC, anon, authenticated;

-- Trigger functions don't need EXECUTE grants to fire on triggers.
REVOKE EXECUTE ON FUNCTION public.snapshot_article()              FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at()                FROM PUBLIC, anon, authenticated;
