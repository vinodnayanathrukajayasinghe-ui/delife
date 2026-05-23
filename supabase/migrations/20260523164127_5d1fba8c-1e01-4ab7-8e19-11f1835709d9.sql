
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins read roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- updated_at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Site settings (single row)
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text,
  whatsapp text,
  email text,
  address text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  hero_headline text,
  hero_subheadline text,
  notification_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins write site settings" ON public.site_settings FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_site_settings_upd BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.site_settings (phone, whatsapp, email, address, hero_headline, hero_subheadline, notification_email)
VALUES ('+94 77 000 0000', '+94770000000', 'info@delifeinterior.com', 'Colombo, Sri Lanka',
        'Crafting Premium Interiors Across Sri Lanka',
        'Bespoke design and turnkey contracting for residences, offices and hospitality.',
        'admin@delifeinterior.com');

-- Services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Admins read all services" ON public.services FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins write services" ON public.services FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_services_upd BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Projects
CREATE TYPE public.project_status AS ENUM ('completed','ongoing','upcoming');

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text,
  location text,
  client text,
  summary text,
  description text,
  cover_image_url text,
  status public.project_status NOT NULL DEFAULT 'completed',
  completion_date date,
  year int,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Admins read all projects" ON public.projects FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins write projects" ON public.projects FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_projects_upd BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project images
CREATE TYPE public.project_image_kind AS ENUM ('gallery','before','after');

CREATE TABLE public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  caption text,
  kind public.project_image_kind NOT NULL DEFAULT 'gallery',
  pair_id uuid,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read project images of published projects" ON public.project_images FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_images.project_id AND p.published = true));
CREATE POLICY "Admins read all project images" ON public.project_images FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins write project images" ON public.project_images FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_project_images_project ON public.project_images(project_id);

-- Gallery images
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text,
  category text,
  display_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (published = true);
CREATE POLICY "Admins manage gallery" ON public.gallery_images FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Page blocks
CREATE TABLE public.page_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  title text,
  body text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read page blocks" ON public.page_blocks FOR SELECT USING (true);
CREATE POLICY "Admins write page blocks" ON public.page_blocks FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_page_blocks_upd BEFORE UPDATE ON public.page_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Leads
CREATE TYPE public.lead_source AS ENUM ('contact_form','whatsapp_inquiry');
CREATE TYPE public.lead_status AS ENUM ('new','contacted','closed');

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source public.lead_source NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  subject text,
  message text,
  page_url text,
  status public.lead_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update leads" ON public.leads FOR UPDATE USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE USING (public.has_role(auth.uid(),'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('project-media','project-media', true);

CREATE POLICY "Public read project media" ON storage.objects FOR SELECT USING (bucket_id = 'project-media');
CREATE POLICY "Admins upload project media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update project media" ON storage.objects FOR UPDATE USING (bucket_id = 'project-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete project media" ON storage.objects FOR DELETE USING (bucket_id = 'project-media' AND public.has_role(auth.uid(),'admin'));
