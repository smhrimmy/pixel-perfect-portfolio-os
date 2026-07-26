
CREATE TABLE public.article_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL,
  kind text NOT NULL DEFAULT 'save',
  note text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.article_history TO authenticated;
GRANT ALL ON public.article_history TO service_role;

ALTER TABLE public.article_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read article history"
ON public.article_history FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin insert article history"
ON public.article_history FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX article_history_article_id_created_at_idx
ON public.article_history (article_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.snapshot_article()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.article_history (article_id, snapshot, kind, created_by)
  VALUES (
    NEW.id,
    to_jsonb(NEW),
    CASE WHEN TG_OP = 'INSERT' THEN 'create' ELSE 'save' END,
    auth.uid()
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER articles_snapshot_ins
AFTER INSERT ON public.articles
FOR EACH ROW EXECUTE FUNCTION public.snapshot_article();

CREATE TRIGGER articles_snapshot_upd
AFTER UPDATE ON public.articles
FOR EACH ROW
WHEN (
  OLD.title IS DISTINCT FROM NEW.title
  OR OLD.slug IS DISTINCT FROM NEW.slug
  OR OLD.excerpt IS DISTINCT FROM NEW.excerpt
  OR OLD.markdown IS DISTINCT FROM NEW.markdown
  OR OLD.cover_image_url IS DISTINCT FROM NEW.cover_image_url
  OR OLD.status IS DISTINCT FROM NEW.status
  OR OLD.template IS DISTINCT FROM NEW.template
)
EXECUTE FUNCTION public.snapshot_article();

CREATE OR REPLACE FUNCTION public.rollback_article(_snapshot_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller uuid := auth.uid();
  snap jsonb;
  aid uuid;
BEGIN
  IF caller IS NULL OR NOT public.has_role(caller, 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  SELECT snapshot, article_id INTO snap, aid
  FROM public.article_history WHERE id = _snapshot_id;

  IF snap IS NULL THEN RAISE EXCEPTION 'snapshot not found'; END IF;

  UPDATE public.articles
  SET title = snap->>'title',
      slug = snap->>'slug',
      excerpt = snap->>'excerpt',
      markdown = COALESCE(snap->>'markdown', ''),
      cover_image_url = snap->>'cover_image_url',
      status = COALESCE(snap->>'status', 'draft'),
      template = COALESCE(snap->>'template', 'editorial-longform'),
      published_at = CASE
        WHEN COALESCE(snap->>'status','draft') = 'published' THEN COALESCE((snap->>'published_at')::timestamptz, now())
        ELSE NULL
      END,
      updated_at = now()
  WHERE id = aid;

  -- Mark this as a rollback in history (trigger will also snapshot new state; we tag ours explicitly).
  INSERT INTO public.article_history (article_id, snapshot, kind, note, created_by)
  VALUES (aid, snap, 'rollback', 'rollback to ' || _snapshot_id::text, caller);

  RETURN jsonb_build_object('article_id', aid);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.rollback_article(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.rollback_article(uuid) TO authenticated;
