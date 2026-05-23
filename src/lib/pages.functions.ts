import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const slugRegex = /^[a-z0-9-]+$/;

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
  og_image_url: z.string().url().max(2000).optional().nullable().or(z.literal("")),
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
      .insert(payload)
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
