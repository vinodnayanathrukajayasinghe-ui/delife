import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Target, Eye, Award } from "lucide-react";
import { brand, whyChooseUs } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: `About Us | ${brand.name}` },
      { name: "description", content: "Learn about DELIFE Interior Pvt Ltd — our vision, mission, core values and full-spectrum interior design and contracting expertise in Sri Lanka." },
      { property: "og:title", content: `About Us | ${brand.name}` },
      { property: "og:description", content: "Vision, mission and values behind DELIFE Interior Pvt Ltd." },
    ],
    links: [{ rel: "canonical", href: "/about-us" }],
  }),
  component: About,
});

function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-[color:var(--section)]">
      <div className="absolute inset-0 -z-10 bg-grid-soft opacity-40" />
      <div className="container-px mx-auto max-w-7xl py-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
          <span className="h-px w-8 bg-[color:var(--gold)]" />{eyebrow}<span className="h-px w-8 bg-[color:var(--gold)]" />
        </div>
        <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="About DELIFE Interior" subtitle="A Sri Lanka–based interior designing and contracting company delivering elegant, functional and durable spaces." />

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <img src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1400&q=80" alt="DELIFE team at work" className="aspect-[5/4] w-full rounded-2xl object-cover shadow-card" />
          <div>
            <SectionHeading eyebrow="Who we are" title="Complete interior & contracting partner" subtitle="DELIFE Interior Pvt Ltd specializes in interior design, 3D visualization, fit-out works, renovations, construction support, commercial interiors, office interiors, customized furniture and project execution." />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">We serve residential, commercial and corporate clients across Sri Lanka — delivering elegant, functional and durable spaces with quality workmanship, professional planning and timely delivery.</p>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {[
            { icon: Eye, title: "Vision", text: "To become a trusted and recognized interior designing and contracting company in Sri Lanka, delivering elegant, functional and high-quality spaces that inspire people, support businesses and create long-term value." },
            { icon: Target, title: "Mission", text: "To provide complete interior designing and contracting solutions through creative design, accurate planning, quality materials, skilled workmanship and reliable project management — completing every project with professionalism, attention to detail and timely execution." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="inline-grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading center eyebrow="Core values" title="The principles behind every project" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Quality Workmanship", "Creativity", "Professionalism", "Customer Satisfaction", "Timely Delivery", "Safety & Reliability"].map((v) => (
            <div key={v} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-card">
              <CheckCircle2 className="h-5 w-5 text-[color:var(--gold)]" />
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why DELIFE */}
      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading center eyebrow="Why DELIFE" title="Designed, built and delivered — by one team" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w) => (
              <div key={w.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <Award className="h-5 w-5 text-[color:var(--gold)]" />
                <h3 className="mt-3 font-display text-lg">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">Explore Our Projects</Link>
          </div>
        </div>
      </section>
    </>
  );
}
