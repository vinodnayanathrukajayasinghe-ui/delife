import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Shield, Award, CheckCircle2, ArrowRight, Building2, Sparkles, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { listPublicProjects } from "@/lib/projects.functions";
import { projectCover, projectTitle } from "@/lib/project-view";
import { brand, contact, services, waLink } from "@/lib/site";
import { CmsPageSection } from "@/components/CmsPageSection";
import { breadcrumbSchema, jsonLd, seoMeta } from "@/lib/seo";

const selectedProjectsQuery = queryOptions({
  queryKey: ["public-projects", "company-profile"],
  queryFn: async () => (await listPublicProjects()).slice(0, 6),
});

const profileImages = {
  hero:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565599846-7ntruc-45396841_389168441622294_4262364315220180992_n.jpg",
  feature:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565597706-v79n92-45282663_389168768288928_8373255957228027904_n.jpg",
  detail:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565602820-dcf4rf-45249923_389168251622313_6503404269461307392_n.jpg",
  planning:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565663842-rfk117-45301754_389167901622348_3229823481130516480_n.jpg",
  vision:
    "https://images.pexels.com/photos/6580568/pexels-photo-6580568.jpeg?auto=compress&cs=tinysrgb&w=1200",
  mission:
    "https://images.pexels.com/photos/5584052/pexels-photo-5584052.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

const companyStrengths = [
  "Interior design and space planning",
  "3D visualization and design development",
  "BOQ preparation and transparent estimation",
  "Ceiling, partition, flooring and wall finishing",
  "Custom joinery, furniture and display systems",
  "Site coordination, supervision and handover",
];

const sectors = ["Homes", "Offices", "Retail", "Restaurants", "Salons", "Banks", "Hotels", "Showrooms"];

const deliveryStandards = [
  { title: "Clear Scope", text: "Each project begins with requirements, measurements, functional needs and budget clarity." },
  { title: "Design Control", text: "Layouts, finishes, lighting and material direction are aligned before execution begins." },
  { title: "Site Discipline", text: "Work is coordinated through practical schedules, site checks and quality-focused handover." },
];

const profileFocus = [
  "Residential interiors, house planning and renovation",
  "Commercial, office and retail fit-out delivery",
  "Hospitality spaces including restaurants, salons and showrooms",
  "Custom furniture, joinery, ceiling, partition and flooring works",
];

export const Route = createFileRoute("/company-profile")({
  loader: ({ context }) => context.queryClient.fetchQuery(selectedProjectsQuery),
  head: () => ({
    ...seoMeta({
      title: "Company Profile | DELIFE Interior Designing and Contracting",
      description:
        "View the company profile of DELIFE Interior Designing and Contracting, including services, vision, mission, project experience and interior design capabilities in Sri Lanka.",
      canonical: "/company-profile",
      image: profileImages.hero,
    }),
    scripts: [jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Company Profile", path: "/company-profile" }]))],
  }),
  component: CompanyProfile,
});

function CompanyProfile() {
  const { data: projects } = useSuspenseQuery(selectedProjectsQuery);
  const metrics = [
    ["100+", "Projects delivered"],
    ["15+", "Years of expertise"],
    ["360°", "Design to handover"],
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-[color:var(--section)]">
        <div className="absolute inset-0 -z-10 bg-grid-soft opacity-45" />
        <div className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container-px mx-auto grid max-w-7xl gap-12 py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
              <span className="h-px w-8 bg-[color:var(--gold)]" />Company Profile
            </div>
            <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">DELIFE Interior Designing and Contracting Company Profile</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{brand.altPositioning}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              DELIFE Interior Designing and Contracting brings design direction, technical planning, material selection and site execution into one coordinated workflow for homes, offices, retail spaces and hospitality projects across Sri Lanka.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink("Hi DELIFE, I would like to discuss a company profile inquiry.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">
                <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-card hover:border-primary hover:text-primary">
                Contact Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {metrics.map(([value, label]) => (
                <div key={label} className="rounded-xl border border-border bg-card/80 p-4 shadow-card backdrop-blur">
                  <div className="font-display text-3xl text-primary">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
              {profileFocus.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-border bg-card/70 p-3 text-sm text-foreground/85 shadow-card backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            <img src={profileImages.hero} alt="DELIFE Interior Designing and Contracting completed interior project Sri Lanka" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-elegant" />
            <div className="grid grid-cols-2 gap-4">
              <img src={profileImages.feature} alt="DELIFE Interior Designing and Contracting residential house interior design" className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
              <img src={profileImages.detail} alt="DELIFE Interior Designing and Contracting ceiling and partition work" className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
            </div>
            <div className="rounded-2xl border border-border bg-card/90 p-5 shadow-card backdrop-blur">
              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" /> {contact.phone}</a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 text-primary" /> {contact.email}</a>
                <div className="flex items-center gap-2 sm:col-span-2"><MapPin className="h-4 w-4 text-primary" /> {contact.address}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl">Overview</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{brand.name} is a Sri Lanka-based interior designing and contracting company specializing in interior design, 3D visualization, fit-out works, renovations, construction support, commercial interiors, office interiors, customized furniture and project execution.</p>
              <p className="mt-3 leading-relaxed text-foreground/85">We work with residential, commercial and corporate clients to deliver elegant, functional and durable spaces through structured planning, quality workmanship and dependable project coordination.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Registered Name", brand.name],
                ["Business Focus", "Interior design, fit-out and contracting"],
                ["Service Area", "Sri Lanka"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-border bg-[color:var(--section)] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)]">{label}</div>
                  <div className="mt-2 text-sm font-semibold leading-relaxed text-foreground">{value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-border bg-[color:var(--section)] shadow-card">
                <img src={profileImages.vision} alt="DELIFE Interior Designing and Contracting vision for interior design Sri Lanka" className="aspect-[16/10] w-full object-cover" />
                <div className="p-7">
                <h2 className="font-display text-2xl">Vision</h2>
                  <p className="mt-3 leading-relaxed text-foreground/85">To be a trusted interior design and contracting partner in Sri Lanka, recognized for refined design, reliable execution and spaces that create lasting value for homes, workplaces and commercial environments.</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">We aim to shape interiors that feel elegant, purposeful and durable, balancing client lifestyle, brand identity and long-term usability.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-[color:var(--section)] shadow-card">
                <img src={profileImages.mission} alt="DELIFE Interior Designing and Contracting mission for house planning Sri Lanka" className="aspect-[16/10] w-full object-cover" />
                <div className="p-7">
                <h2 className="font-display text-2xl">Mission</h2>
                  <p className="mt-3 leading-relaxed text-foreground/85">To deliver complete interior, fit-out and contracting solutions through thoughtful design, accurate planning, quality materials, skilled workmanship and disciplined project management.</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Our mission is to turn ideas into buildable, well-managed spaces with clear documentation, dependable teams and consistent finishing standards.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-xl">
                  <h2 className="font-display text-2xl">Core Capabilities</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    DELIFE supports clients from first concept to final handover, combining design thinking with practical site execution.
                  </p>
                </div>
                <div className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  Design + Build
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {companyStrengths.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-[color:var(--section)] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <span className="text-sm font-medium text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-border bg-[color:var(--section)] p-7">
                <h2 className="font-display text-2xl">Sectors We Serve</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We work across residential, corporate, retail and hospitality environments, adapting each design to the user experience and operational needs of the space.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {sectors.map((sector) => (
                    <span key={sector} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground/80">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {deliveryStandards.map((standard, index) => (
                  <div key={standard.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)]">0{index + 1}</div>
                    <h3 className="mt-2 font-display text-lg">{standard.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{standard.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl">Our Services</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.slice(0, 12).map((s) => (
                  <div key={s.slug} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <div>
                      <div className="text-sm font-semibold">{s.title}</div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.short}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl">Selected Projects</h2>
                <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  View all projects <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                  <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                    <img src={projectCover(p)} alt={`${brand.name} ${projectTitle(p)} project Sri Lanka`} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                    <div className="p-4">
                      {p.category && <div className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--gold)]">{p.category}</div>}
                      <div className="font-display">{projectTitle(p)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <img src={profileImages.planning} alt="DELIFE Interior Designing and Contracting planning and fit-out work" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <Award className="h-5 w-5 text-[color:var(--gold)]" />
              <h3 className="mt-3 font-display text-lg">Quality-Focused</h3>
              <p className="mt-2 text-sm text-muted-foreground">Premium materials, in-house skilled teams and disciplined quality control on every site.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <Shield className="h-5 w-5 text-[color:var(--gold)]" />
              <h3 className="mt-3 font-display text-lg">Safety & Professionalism</h3>
              <p className="mt-2 text-sm text-muted-foreground">We follow strict safety practices and uphold transparent, professional conduct on every project.</p>
            </div>
            <div className="rounded-xl border border-border bg-primary p-6 text-primary-foreground shadow-card">
              <Sparkles className="h-5 w-5" />
              <h3 className="mt-3 font-display text-lg">Complete Project Partner</h3>
              <p className="mt-2 text-sm text-primary-foreground/85">Design concepts, BOQs, fit-out teams, site coordination and final handover managed under one accountable workflow.</p>
            </div>
          </aside>
        </div>
      </section>

      <CmsPageSection slug="company-profile" />
    </>
  );
}
