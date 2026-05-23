import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Facebook, Send } from "lucide-react";
import { brand, contact, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${brand.name}` },
      { name: "description", content: "Contact DELIFE Interior Pvt Ltd for interior design, fit-out and contracting projects in Sri Lanka. Call, WhatsApp or email us for a free consultation." },
      { property: "og:title", content: `Contact | ${brand.name}` },
      { property: "og:description", content: "Get in touch with the DELIFE team." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const buildMessage = () =>
    `Hello DELIFE,%0A%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0A%0A${form.message}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${contact.whatsapp}?text=${buildMessage()}`, "_blank");
  };

  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto max-w-7xl py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />Contact<span className="h-px w-8 bg-[color:var(--gold)]" />
          </div>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">Let's design something elegant</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">Reach out for a free consultation. We typically respond within one business day.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">Submitting routes your inquiry directly to our WhatsApp.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project…" className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="submit" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
                  <Send className="h-4 w-4" /> Send on WhatsApp
                </button>
                <a href={`mailto:${contact.email}?subject=Project%20Inquiry&body=${buildMessage()}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                  <Mail className="h-4 w-4" /> Email us instead
                </a>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl">Get in touch</h3>
              <ul className="mt-4 space-y-4 text-sm">
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
    </>
  );
}
