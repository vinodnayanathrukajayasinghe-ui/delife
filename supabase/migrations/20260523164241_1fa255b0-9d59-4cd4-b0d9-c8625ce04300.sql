
-- Leads: remove broad public insert; submissions go through a server route using the service key
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

-- has_role: revoke from anon, grant only to authenticated (still callable inside RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
