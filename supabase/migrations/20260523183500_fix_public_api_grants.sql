-- Ensure Supabase Data API roles can reach exposed tables/functions.
-- RLS policies still decide which rows can be read or changed.
grant usage on schema public to anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated, service_role;

grant select on table public.projects to anon, authenticated;
grant insert, update, delete on table public.projects to authenticated;

grant select on table public.project_images to anon, authenticated;
grant insert, update, delete on table public.project_images to authenticated;

grant select on table public.site_settings to anon, authenticated;
grant update on table public.site_settings to authenticated;

grant select on table public.services to anon, authenticated;
grant insert, update, delete on table public.services to authenticated;

grant select on table public.gallery_images to anon, authenticated;
grant insert, update, delete on table public.gallery_images to authenticated;

grant select on table public.page_blocks to anon, authenticated;
grant insert, update, delete on table public.page_blocks to authenticated;

grant select on table public.pages to anon, authenticated;
grant insert, update, delete on table public.pages to authenticated;

grant select, insert, update, delete on table public.leads to authenticated;
