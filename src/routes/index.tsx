import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Sparkles } from "lucide-react";
import { listPublicProjects } from "@/lib/projects.functions";
import { projectCover, projectTitle } from "@/lib/project-view";
import { brand, contact, processSteps, services, testimonials, waLink, whyChooseUs } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";

const featuredProjectsQuery = queryOptions({
  queryKey: ["public-projects", "featured"],
  queryFn: async () => {
    const projects = await listPublicProjects();
    const featured = projects.filter((project) => project.featured);
    return (featured.length > 0 ? featured : projects).slice(0, 6);
  },
});

const homeImages = {
  about:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  why: [
    "https://images.unsplash.com/photo-1616486701797-0f33f61038ec?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581091870622-1e7e4e0f20d6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  ],
  services: {
    "interior-designing":
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    "3d-design-visualization":
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=900&q=80",
    "house-planning":
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    "concept-drawings":
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    "boq-estimation":
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    "fit-out-works":
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
  } satisfies Record<string, string>,
  process: [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
  ],
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.fetchQuery(featuredProjectsQuery),
  head: () => ({
    meta: [
      { title: `${brand.name} | Elegant Interior Designing & Contracting` },
      { name: "description", content: "DELIFE Interior Pvt Ltd delivers premium interior design, 3D planning, fit-out, renovation and contracting solutions across Sri Lanka." },
      { property: "og:title", content: `${brand.name} | Elegant Interior Designing & Contracting` },
      { property: "og:description", content: brand.altPositioning },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { data: featured } = useSuspenseQuery(featuredProjectsQuery);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80"
            alt="Premium interior living space"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background" />
          <div className="absolute inset-0 bg-grid-soft opacity-30" />
        </div>

        <div className="container-px mx-auto grid max-w-7xl gap-12 py-10 md:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              {brand.primaryLine} · Sri Lanka
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              Elegant Interior <span className="text-gradient-gold">Designing</span> <br className="hidden sm:block" />
              & Contracting Solutions
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {brand.name} delivers professional interior design, 3D planning, fit-out, renovation and contracting solutions for residential, commercial and corporate projects.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-card transition hover:border-primary hover:text-primary">
                Free Consultation
              </Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["100+", "Projects Delivered"],
                ["15+", "Years of Expertise"],
                ["100%", "Quality Guaranteed"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-display text-3xl text-primary">{k}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-elegant">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Modern residence by DELIFE" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-xl border border-border bg-card/95 p-4 shadow-card backdrop-blur md:block">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Now Building</div>
              <div className="mt-1 font-display text-lg leading-tight">Modern House Design</div>
              <div className="mt-1 text-xs text-muted-foreground">Western Province · 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src={homeImages.about} alt="Completed premium interior living space" className="aspect-[5/4] w-full rounded-2xl object-cover shadow-card" />
            <img src={brand.logoIcon} alt="" className="absolute -bottom-8 -right-6 hidden h-32 w-32 rounded-full bg-card p-3 shadow-elegant ring-1 ring-border md:block" />
          </div>
          <div>
            <SectionHeading eyebrow="About DELIFE" title="Crafting elegant spaces, with precision." subtitle="We are a Sri Lanka–based interior designing and contracting company delivering complete design, fit-out and construction support across residential, commercial, corporate and hospitality projects." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Quality Workmanship", "Creative Design", "Professionalism", "On-Time Delivery", "Customer Satisfaction", "Safety & Reliability"].map((v) => (
                <li key={v} className="flex items-center gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)]" /> {v}
                </li>
              ))}
            </ul>
            <Link to="/about-us" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">
              More about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading center eyebrow="Why DELIFE" title="Built around quality, creativity and delivery" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((w, i) => (
              <div key={w.title} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={homeImages.why[i]} alt={w.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="font-display text-sm text-[color:var(--gold)]">0{i + 1}</div>
                  <h3 className="mt-2 font-display text-xl text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="What we do" title="Complete interior & contracting services" />
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">All services →</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <Link key={s.slug} to="/services" className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={homeImages.services[s.slug]} alt={s.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Featured work" title="Selected projects" />
            <Link to="/projects" className="text-sm font-semibold text-primary hover:underline">All projects →</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={projectCover(p)} alt={projectTitle(p)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  {p.category && <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">{p.category}</div>}
                  <h3 className="mt-1 font-display text-lg leading-tight">{projectTitle(p)}</h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">View Project <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading center eyebrow="Our process" title="A clear, professional journey" subtitle="From the first conversation to final handover — every project is delivered through a disciplined six-step process." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {processSteps.map((s, i) => (
            <div key={s.n} className="overflow-hidden rounded-xl border border-border bg-card text-center shadow-card">
              <img src={homeImages.process[i]} alt={s.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <div className="font-display text-2xl text-[color:var(--gold)]">{s.n}</div>
                <div className="mt-1 font-display text-lg">{s.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading center eyebrow="Client trust" title="What our clients say" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-3xl text-[color:var(--gold)]">“</div>
                <blockquote className="mt-2 text-sm leading-relaxed text-foreground/85">{t.quote}</blockquote>
                <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--navy)] to-[color:var(--royal)] px-6 py-14 text-center text-white shadow-elegant sm:px-12">
          <div className="absolute inset-0 bg-grid-soft opacity-10" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl">Let's craft your next elegant space.</h2>
            <p className="mt-3 text-white/80">Talk to our design and contracting team for a free consultation and concept walkthrough.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-card hover:opacity-95">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <a href={`tel:${contact.phoneRaw}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
