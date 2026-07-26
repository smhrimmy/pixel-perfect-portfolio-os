
GRANT EXECUTE ON FUNCTION public.bootstrap_first_admin()        TO service_role;
GRANT EXECUTE ON FUNCTION public.publish_draft(text)             TO service_role;
GRANT EXECUTE ON FUNCTION public.rollback_to(uuid)               TO service_role;
GRANT EXECUTE ON FUNCTION public.rollback_article(uuid)          TO service_role;
