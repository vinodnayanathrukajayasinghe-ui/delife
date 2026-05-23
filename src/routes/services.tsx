import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { brand, services, waLink } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services | ${brand.name}` },
      { name: "description", content: "Interior design, 3D visualization, fit-out, renovation, custom furniture, ceiling, partition and full contracting services by DELIFE Interior Pvt Ltd." },
      { property: "og:title", content: `Services | ${brand.name}` },
      { property: "og:description", content: "Complete interior designing and contracting services across Sri Lanka." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto max-w-7xl py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />Our Services<span className="h-px w-8 bg-[color:var(--gold)]" />
          </div>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">Complete interior & contracting services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">From the first concept sketch to final handover — every service delivered by skilled, in-house teams with attention to detail.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.slug} className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="font-display text-xs text-[color:var(--gold)]">{String(i + 1).padStart(2, "0")}</div>
              <h2 className="mt-1 font-display text-xl text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <a href={waLink(`Hi DELIFE, I'd like to inquire about ${s.title}.`)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Inquire on WhatsApp →
              </a>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-[color:var(--section)] p-8 text-center shadow-card sm:p-12">
          <h2 className="font-display text-2xl sm:text-3xl">Have a project in mind?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Send us a quick brief — we'll respond with a clear plan and an indicative estimate.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">Get a Free Consultation</Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
