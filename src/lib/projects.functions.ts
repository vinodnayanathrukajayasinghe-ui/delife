import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

// PUBLIC reads
export const listPublicProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id,title,slug,category,location,summary,cover_image_url,status,completion_date,year,featured,display_order")
    .eq("published", true)
    .order("display_order")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPublicProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!project) return null;
    const { data: images } = await supabaseAdmin
      .from("project_images")
      .select("id,url,caption,kind,pair_id,display_order")
      .eq("project_id", project.id)
      .order("display_order");
    return { project, images: images ?? [] };
  });

// ADMIN reads/writes
export const adminListProjects = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("display_order")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminGetProject = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const [{ data: project, error: e1 }, { data: images, error: e2 }] = await Promise.all([
      supabaseAdmin.from("projects").select("*").eq("id", data.id).maybeSingle(),
      supabaseAdmin.from("project_images").select("*").eq("project_id", data.id).order("display_order"),
    ]);
    if (e1) throw new Error(e1.message);
    if (e2) throw new Error(e2.message);
    return { project, images: images ?? [] };
  });

const projectInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().max(120).optional(),
  category: z.string().max(120).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  client: z.string().max(200).optional().nullable(),
  summary: z.string().max(500).optional().nullable(),
  description: z.string().max(10000).optional().nullable(),
  cover_image_url: z.string().url().max(2000).optional().nullable(),
  status: z.enum(["completed", "ongoing", "upcoming"]).default("completed"),
  completion_date: z.string().optional().nullable(),
  year: z.number().int().min(1900).max(2100).optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  display_order: z.number().int().default(0),
});

export const adminSaveProject = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: unknown) => projectInput.parse(d))
  .handler(async ({ data }) => {
    const slug = (data.slug && data.slug.length > 0 ? data.slug : slugify(data.title));
    const payload = { ...data, slug, completion_date: data.completion_date || null };
    if (data.id) {
      const { error } = await supabaseAdmin.from("projects").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    } else {
      const { data: row, error } = await supabaseAdmin.from("projects").insert(payload).select("id").single();
      if (error) throw new Error(error.message);
      return { id: row.id };
    }
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminAddProjectImage = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: unknown) =>
    z.object({
      project_id: z.string().uuid(),
      url: z.string().url().max(2000),
      caption: z.string().max(300).optional(),
      kind: z.enum(["gallery", "before", "after"]).default("gallery"),
      pair_id: z.string().uuid().optional(),
      display_order: z.number().int().default(0),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("project_images")
      .insert(data)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const adminDeleteProjectImage = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("project_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Signed upload URL for direct browser-to-storage upload
export const adminCreateUploadUrl = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { filename: string }) =>
    z.object({ filename: z.string().min(1).max(200).regex(/^[a-zA-Z0-9._-]+$/) }).parse(d),
  )
  .handler(async ({ data }) => {
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${data.filename}`;
    const { data: signed, error } = await supabaseAdmin.storage
      .from("project-media")
      .createSignedUploadUrl(path);
    if (error) throw new Error(error.message);
    const { data: pub } = supabaseAdmin.storage.from("project-media").getPublicUrl(path);
    return { path, token: signed.token, signedUrl: signed.signedUrl, publicUrl: pub.publicUrl };
  });
