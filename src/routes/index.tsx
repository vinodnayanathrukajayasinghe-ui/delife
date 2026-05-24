import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Sparkles } from "lucide-react";
import { listPublicProjects } from "@/lib/projects.functions";
import { projectCover, projectTitle } from "@/lib/project-view";
import { brand, contact, processSteps, services, testimonials, waLink, whyChooseUs } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { CmsPageSection } from "@/components/CmsPageSection";
import { breadcrumbSchema, jsonLd, seoMeta } from "@/lib/seo";

const featuredProjectsQuery = queryOptions({
  queryKey: ["public-projects", "featured"],
  queryFn: async () => {
    const projects = await listPublicProjects();
    const featured = projects.filter((project) => project.featured);
    return (featured.length > 0 ? featured : projects).slice(0, 6);
  },
});

const homeImages = {
  hero: [
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565596923-a72d6w-45383136_389168851622253_3094791556180213760_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565597706-v79n92-45282663_389168768288928_8373255957228027904_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565602820-dcf4rf-45249923_389168251622313_6503404269461307392_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565663842-rfk117-45301754_389167901622348_3229823481130516480_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/1779563281742-gtra53-150449385_1899567890184442_6502514476577355847_n.jpg",
  ],
  about:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565599846-7ntruc-45396841_389168441622294_4262364315220180992_n.jpg",
  why: [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  ],
  services: {
    "interior-designing":
      "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565674592-o3zghh-36188128_304210623451410_5751688523400871936_n.jpg",
    "3d-design-visualization":
      "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565707546-o7ekkl-487006160_1835359443669846_5010012192749288785_n.jpg",
    "house-planning":
      "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565708886-bjofq5-486523916_1835359240336533_4783075265497774724_n.jpg",
    "concept-drawings":
      "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565582086-alnger-70849714_547358065803330_151406221478330368_n.jpg",
    "boq-estimation":
      "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565585171-hmadct-69522738_547357532470050_7986397365135212544_n.jpg",
    "fit-out-works":
      "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565583070-5edqso-69823596_547357839136686_7766305631522258944_n.jpg",
  } satisfies Record<string, string>,
  process: [
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565678780-tjhx0l-486459842_1835358983669892_1545320130660225109_n__1_.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565582086-alnger-70849714_547358065803330_151406221478330368_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565707546-o7ekkl-487006160_1835359443669846_5010012192749288785_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565585171-hmadct-69522738_547357532470050_7986397365135212544_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565590179-76t5v5-69782022_547356799136790_3442900356328062976_n.jpg",
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565597706-v79n92-45282663_389168768288928_8373255957228027904_n.jpg",
  ],
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.fetchQuery(featuredProjectsQuery),
  head: () => ({
    ...seoMeta({
      title: "DELIFE Interior Designing and Contracting | Interior Design Sri Lanka",
      description:
        "DELIFE Interior Designing and Contracting offers professional interior designing, 3D visualization, fit-out, renovation and contracting services for homes, offices and commercial spaces in Sri Lanka.",
      canonical: "/",
    }),
    scripts: [jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }]))],
  }),
  component: Home,
});

function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % homeImages.hero.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-elegant">
      {homeImages.hero.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="DELIFE Interior Designing and Contracting completed interior project gallery Sri Lanka"
          className={`absolute inset-0 h-full w-full object-cover transition duration-1000 ${
            index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/80 px-3 py-2 shadow-card backdrop-blur">
        {homeImages.hero.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show completed project ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all ${index === active ? "w-6 bg-primary" : "w-1.5 bg-primary/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { data: featured } = useSuspenseQuery(featuredProjectsQuery);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80"
            alt="DELIFE Interior Designing and Contracting residential house interior design Sri Lanka"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/65" />
          <div className="absolute inset-0 bg-grid-soft opacity-25" />
        </div>

        <div className="container-px mx-auto grid max-w-7xl gap-12 py-14 md:py-18 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
              {brand.primaryLine} · Sri Lanka
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.6rem]">
              Elegant Interior <span className="text-gradient-gold">Designing</span> <br className="hidden sm:block" />
              & Contracting Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              DELIFE Interior Designing and Contracting is a professional interior design and contracting company in Sri Lanka, delivering creative, functional and high-quality spaces for residential, commercial and corporate clients.
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

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["100+", "Projects Delivered"],
                ["15+", "Years of Expertise"],
                ["360", "Design to Handover"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-card/90 p-4 shadow-card backdrop-blur">
                  <div className="font-display text-3xl text-primary">{k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <HeroCarousel />
            <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-xl border border-border bg-card/95 p-4 shadow-card backdrop-blur md:block">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">DELIFE Delivery</div>
              <div className="mt-1 font-display text-lg leading-tight">Design, fit-out and finishing by one team</div>
              <div className="mt-1 text-xs text-muted-foreground">Completed project gallery</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src={homeImages.about} alt="DELIFE Interior Designing and Contracting commercial fit-out project" className="aspect-[5/4] w-full rounded-2xl object-cover shadow-card" />
            <img src={brand.logoIcon} alt={`${brand.name} logo`} className="absolute -bottom-8 -right-6 hidden h-32 w-32 rounded-full bg-card p-3 shadow-elegant ring-1 ring-border md:block" />
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
                  <img src={homeImages.why[i]} alt={`${brand.name} ${w.title.toLowerCase()} Sri Lanka`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
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
                <img src={homeImages.services[s.slug]} alt={`${brand.name} ${s.title} Sri Lanka`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
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
                  <img src={projectCover(p)} alt={`${brand.name} ${projectTitle(p)} project Sri Lanka`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
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
              <img src={homeImages.process[i]} alt={`${brand.name} ${s.title.toLowerCase()} process Sri Lanka`} className="aspect-[4/3] w-full object-cover" />
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

      <CmsPageSection slug="home" />

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
