alter table public.pages
  add column if not exists meta_keywords text,
  add column if not exists og_title text,
  add column if not exists og_description text,
  add column if not exists canonical_url text;

alter table public.projects
  add column if not exists seo_title text,
  add column if not exists meta_description text;

alter table public.project_images
  add column if not exists alt_text text;

alter table public.gallery_images
  add column if not exists alt_text text;
