import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const slugRegex = /^[a-z0-9-]+$/;

export const websitePagePaths: Record<string, string> = {
  home: "/",
  "about-us": "/about-us",
  services: "/services",
  projects: "/projects",
  gallery: "/gallery",
  "company-profile": "/company-profile",
  contact: "/contact",
};

const websitePages = [
  {
    title: "Home",
    slug: "home",
    excerpt: "Editable content for the home page.",
    content_html:
      "<h2>Welcome to DELIFE Interior</h2><p>Update this block from the admin panel to add homepage announcements, featured offers, company highlights or important service information.</p>",
    published: true,
    display_order: 1,
  },
  {
    title: "About Us",
    slug: "about-us",
    excerpt: "Editable content for the About Us page.",
    content_html:
      "<h2>About DELIFE Interior</h2><p>Use this section to update company background, team details, certifications, vision, mission and values without changing code.</p>",
    published: true,
    display_order: 2,
  },
  {
    title: "Services",
    slug: "services",
    excerpt: "Editable content for the services page.",
    content_html:
      "<h2>Service Notes</h2><p>Add service introductions, special packages, warranty information, process details or frequently requested service details here.</p>",
    published: true,
    display_order: 3,
  },
  {
    title: "Projects",
    slug: "projects",
    excerpt: "Editable content for the projects page.",
    content_html:
      "<h2>Project Portfolio</h2><p>Add portfolio notes, featured project summaries or client-sector descriptions here. Individual projects are managed from the Projects tab.</p>",
    published: true,
    display_order: 4,
  },
  {
    title: "Gallery",
    slug: "gallery",
    excerpt: "Editable content for the gallery page.",
    content_html:
      "<h2>Gallery Information</h2><p>Add image collection notes, project photography descriptions or category explanations here. Gallery images are managed from the Gallery tab.</p>",
    published: true,
    display_order: 5,
  },
  {
    title: "Company Profile",
    slug: "company-profile",
    excerpt: "Editable content for the company profile page.",
    content_html:
      "<h2>Company Profile Updates</h2><p>Add updated company achievements, capabilities, sectors, credentials and profile notes here.</p>",
    published: true,
    display_order: 6,
  },
  {
    title: "Contact",
    slug: "contact",
    excerpt: "Editable content for the contact page.",
    content_html:
      "<h2>Contact Page Notes</h2><p>Add consultation instructions, showroom visit notes, response times or project inquiry guidance here. Contact details are managed from Site Settings.</p>",
    published: true,
    display_order: 7,
  },
];

// PUBLIC
export const listPublicPages = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("pages")
    .select("id,slug,title,excerpt,display_order")
    .eq("published", true)
    .order("display_order")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPublicPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(120).regex(slugRegex) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { data: page, error } = await supabaseAdmin
      .from("pages")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return page;
  });

// ADMIN
export const adminListPages = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("pages")
      .select("*")
      .order("display_order")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminEnsureWebsitePages = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("pages")
      .upsert(websitePages, { onConflict: "slug", ignoreDuplicates: false })
      .select("id,slug");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminGetPage = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { data: page, error } = await supabaseAdmin
      .from("pages")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return page;
  });

const pageInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().max(120).regex(slugRegex).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  content_html: z.string().max(200000).default(""),
  meta_title: z.string().max(200).optional().nullable(),
  meta_description: z.string().max(400).optional().nullable(),
  meta_keywords: z.string().max(1000).optional().nullable(),
  og_title: z.string().max(200).optional().nullable(),
  og_description: z.string().max(400).optional().nullable(),
  og_image_url: z.string().url().max(2000).optional().nullable().or(z.literal("")),
  canonical_url: z.string().max(2000).optional().nullable(),
  published: z.boolean().default(false),
  display_order: z.number().int().default(0),
});

export const adminSavePage = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: unknown) => pageInput.parse(d))
  .handler(async ({ data }) => {
    const slug = data.slug && data.slug.length > 0 ? data.slug : slugify(data.title);
    const payload = {
      ...data,
      slug,
      og_image_url: data.og_image_url || null,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("pages").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await supabaseAdmin
      .from("pages")
      .upsert(payload, { onConflict: "slug", ignoreDuplicates: false })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const adminDeletePage = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("pages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
