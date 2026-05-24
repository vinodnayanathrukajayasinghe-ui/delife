import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Facebook, Send } from "lucide-react";
import { brand, contact, waLink } from "@/lib/site";
import { CmsPageSection } from "@/components/CmsPageSection";
import { breadcrumbSchema, jsonLd, localBusinessSchema, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...seoMeta({
      title: "Contact DELIFE Interior Designing and Contracting | Sri Lanka",
      description:
        "Contact DELIFE Interior Designing and Contracting for interior designing, 3D planning, fit-out, renovation and contracting services in Sri Lanka.",
      canonical: "/contact",
    }),
    scripts: [
      jsonLd(localBusinessSchema()),
      jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])),
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact_form",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "Could not send");
      setDone(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (e: any) {
      setErr(e?.message ?? "Could not send. Please try again or WhatsApp us.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto max-w-7xl py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />Contact<span className="h-px w-8 bg-[color:var(--gold)]" />
          </div>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">Contact DELIFE Interior Designing and Contracting</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">Reach out for a free consultation. We typically respond within one business day.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your inquiry is sent directly to our team.</p>
              {done && <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">Thank you — we've received your message and will get back to you shortly.</p>}
              {err && <p className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project…" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60">
                  <Send className="h-4 w-4" /> {busy ? "Sending…" : "Send message"}
                </button>
                <a href={waLink(`Hi DELIFE, I'd like to inquire about a project.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl">Get in touch</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3"><div><div className="text-xs uppercase tracking-wider text-muted-foreground">Business Name</div><div>{brand.name}</div></div></li>
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div><div>{contact.address}</div></div></li>
                <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-xs uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</div><a href={`tel:${contact.phoneRaw}`} className="hover:text-primary">{contact.phone}</a><div className="text-xs text-muted-foreground">Alt: {contact.secondary}</div></div></li>
                <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div><a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a></div></li>
                <li className="flex items-start gap-3"><Facebook className="mt-0.5 h-4 w-4 text-primary" /><div><div className="text-xs uppercase tracking-wider text-muted-foreground">Facebook</div><a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">DELIFE Interior</a></div></li>
              </ul>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
              </a>
              <div className="mt-4 text-center text-xs text-muted-foreground">{contact.hours}</div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <iframe
                title="DELIFE Location"
                src="https://www.google.com/maps?q=Battaramulla%20Sri%20Lanka&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>

      <CmsPageSection slug="contact" />
    </>
  );
}
