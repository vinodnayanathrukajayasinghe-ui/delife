import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save } from "lucide-react";
import { adminGetSettings, adminSaveSettings } from "@/lib/settings.functions";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  const qc = useQueryClient();
  const get = useServerFn(adminGetSettings);
  const save = useServerFn(adminSaveSettings);
  const q = useQuery({ queryKey: ["admin", "settings"], queryFn: () => get() });
  const [form, setForm] = useState<any>(null);
  useEffect(() => { if (q.data && !form) setForm(q.data); }, [q.data, form]);

  const mut = useMutation({
    mutationFn: async () => save({ data: form }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "settings"] }),
  });

  if (!form) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const f = (label: string, key: string, type: string = "text") => (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <input type={type} value={form[key] ?? ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
    </label>
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Site Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Public contact details and the email that receives new lead notifications.</p>
        </div>
        <button onClick={() => mut.mutate()} disabled={mut.isPending} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60">
          <Save className="h-4 w-4" /> {mut.isPending ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-5 shadow-card sm:grid-cols-2">
        {f("Phone", "phone")}
        {f("WhatsApp (digits only, with country code)", "whatsapp")}
        {f("Public email", "email", "email")}
        {f("Notification email (where leads are sent)", "notification_email", "email")}
        <div className="sm:col-span-2">{f("Address", "address")}</div>
        {f("Facebook URL", "facebook_url")}
        {f("Instagram URL", "instagram_url")}
        {f("LinkedIn URL", "linkedin_url")}
        <div />
        <div className="sm:col-span-2">{f("Hero headline", "hero_headline")}</div>
        <div className="sm:col-span-2">{f("Hero subheadline", "hero_subheadline")}</div>
        <div className="sm:col-span-2">{f("Hero background image URL", "hero_image_url")}</div>
        {f("Hero CTA label", "hero_cta_label")}
        {f("Hero CTA link", "hero_cta_href")}
      </div>
    </div>
  );
}
