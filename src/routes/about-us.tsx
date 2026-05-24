import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, CheckCircle2, Eye, Target } from "lucide-react";
import { brand, whyChooseUs } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { CmsPageSection } from "@/components/CmsPageSection";
import { breadcrumbSchema, jsonLd, seoMeta } from "@/lib/seo";

const aboutImages = {
  hero:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
  studio:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  planning:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
  execution:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565583070-5edqso-69823596_547357839136686_7766305631522258944_n.jpg",
  finishing:
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565597706-v79n92-45282663_389168768288928_8373255957228027904_n.jpg",
  vision:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
  mission:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
};

export const Route = createFileRoute("/about-us")({
  head: () => ({
    ...seoMeta({
      title: "About DELIFE Interior Designing and Contracting | Sri Lanka",
      description:
        "Learn about DELIFE Interior Designing and Contracting, a professional interior designing and contracting company in Sri Lanka focused on creative design, quality workmanship and reliable project execution.",
      canonical: "/about-us",
      image: aboutImages.hero,
    }),
    scripts: [jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about-us" }]))],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-[color:var(--section)]">
        <div className="absolute inset-0 -z-10 bg-grid-soft opacity-30" />
        <div className="container-px mx-auto grid max-w-7xl gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
              <span className="h-px w-8 bg-[color:var(--gold)]" />About DELIFE
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              About DELIFE Interior Designing and Contracting
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              DELIFE Interior Designing and Contracting is a Sri Lanka-based interior designing and contracting company focused on refined spaces, practical planning, skilled workmanship and dependable project delivery.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Design", "Concepts, layouts and 3D direction"],
                ["Build", "Fit-out, partitions, ceilings and joinery"],
                ["Deliver", "Quality finishing and handover support"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-border bg-card/90 p-4 shadow-card">
                  <div className="font-display text-xl text-primary">{title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl shadow-elegant">
              <img src={aboutImages.hero} alt="DELIFE Interior Designing and Contracting professional interior design company Sri Lanka" className="aspect-[16/11] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-4 sm:grid-cols-5">
            <img src={aboutImages.studio} alt="DELIFE Interior Designing and Contracting residential house interior design Sri Lanka" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card sm:col-span-5" />
            <img src={aboutImages.planning} alt="DELIFE Interior Designing and Contracting house planning and BOQ estimation Sri Lanka" className="aspect-[4/3] w-full rounded-xl object-cover shadow-card sm:col-span-2" />
            <img src={aboutImages.execution} alt="DELIFE Interior Designing and Contracting interior fit-out Sri Lanka" className="aspect-[4/3] w-full rounded-xl object-cover shadow-card sm:col-span-3" />
          </div>
          <div>
            <SectionHeading eyebrow="Who we are" title="A complete interior and contracting partner" subtitle="We combine creative interior concepts with practical site execution, so clients can move from idea to handover through one coordinated team." />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Our work covers residential interiors, commercial spaces, office interiors, hospitality fit-outs, 3D visualization, house planning, BOQ preparation, ceiling and partition work, flooring, customized furniture and renovation support.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Clear design direction", "Accurate planning", "Quality materials", "Skilled workmanship", "Transparent coordination", "Reliable handover"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)]" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {[
            {
              icon: Eye,
              title: "Vision",
              image: aboutImages.vision,
              text: "To become a trusted and recognized interior designing and contracting company in Sri Lanka, known for refined design, reliable execution and spaces that create lasting value for homes, workplaces and commercial environments.",
            },
            {
              icon: Target,
              title: "Mission",
              image: aboutImages.mission,
              text: "To deliver complete interior, fit-out and contracting solutions through thoughtful design, accurate planning, quality materials, skilled workmanship and disciplined project management.",
            },
          ].map(({ icon: Icon, title, image, text }) => (
            <article key={title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img src={image} alt={`${brand.name} ${title.toLowerCase()} interior design Sri Lanka`} className="aspect-[16/9] w-full object-cover" />
              <div className="p-8">
                <div className="inline-grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading center eyebrow="Core values" title="The principles behind every project" subtitle="Every project is managed around durable results, clear communication and a finish that reflects the client, site and budget." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Quality Workmanship", "Creativity", "Professionalism", "Customer Satisfaction", "Timely Delivery", "Safety & Reliability"].map((value) => (
            <div key={value} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-card">
              <CheckCircle2 className="h-5 w-5 text-[color:var(--gold)]" />
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--section)] py-20">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading center eyebrow="Why DELIFE" title="Designed, built and delivered by one team" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <Award className="h-5 w-5 text-[color:var(--gold)]" />
                <h3 className="mt-3 font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">
              Explore Our Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CmsPageSection slug="about-us" />
    </>
  );
}
