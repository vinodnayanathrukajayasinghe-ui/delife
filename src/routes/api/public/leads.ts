import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  source: z.enum(["contact_form", "whatsapp_inquiry"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
  page_url: z.string().max(500).optional().or(z.literal("")),
  // honeypot
  website: z.string().max(0).optional(),
});

async function sendNotificationEmail(lead: {
  source: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  page_url?: string | null;
}) {
  try {
    // Try to send email notifications if a provider is configured; silently no-op otherwise.
    const { data: settings } = await supabaseAdmin
      .from("site_settings")
      .select("notification_email")
      .limit(1)
      .maybeSingle();
    const to = settings?.notification_email;
    if (!to) return;
    const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
    if (!EMAIL_API_KEY) return;
    // Provider integration can be added here without changing the public contact form flow.
  } catch (e) {
    console.error("notification email error", e);
  }
}

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
        }
        if (parsed.data.website) {
          // honeypot tripped — pretend success
          return Response.json({ ok: true });
        }
        const d = parsed.data;
        const { data: row, error } = await supabaseAdmin
          .from("leads")
          .insert({
            source: d.source,
            name: d.name,
            email: d.email || null,
            phone: d.phone || null,
            subject: d.subject || null,
            message: d.message,
            page_url: d.page_url || null,
          })
          .select("id")
          .single();
        if (error) {
          console.error("lead insert error", error);
          return Response.json({ error: "Could not save inquiry" }, { status: 500 });
        }
        await sendNotificationEmail(d);
        return Response.json({ ok: true, id: row.id });
      },
    },
  },
});
