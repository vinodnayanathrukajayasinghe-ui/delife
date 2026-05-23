import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getPublicSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("phone,whatsapp,email,address,facebook_url,instagram_url,linkedin_url,hero_headline,hero_subheadline")
    .limit(1)
    .maybeSingle();
  return data;
});

export const adminGetSettings = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
    const { data, error } = await supabaseAdmin.from("site_settings").select("*").limit(1).maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

const settingsSchema = z.object({
  id: z.string().uuid(),
  phone: z.string().max(40).optional().nullable(),
  whatsapp: z.string().max(40).optional().nullable(),
  email: z.string().max(255).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  facebook_url: z.string().max(2000).optional().nullable(),
  instagram_url: z.string().max(2000).optional().nullable(),
  linkedin_url: z.string().max(2000).optional().nullable(),
  hero_headline: z.string().max(200).optional().nullable(),
  hero_subheadline: z.string().max(400).optional().nullable(),
  notification_email: z.string().max(255).optional().nullable(),
});

export const adminSaveSettings = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: unknown) => settingsSchema.parse(d))
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    const { error } = await supabaseAdmin.from("site_settings").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
