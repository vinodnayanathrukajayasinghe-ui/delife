import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { brand, services, waLink } from "@/lib/site";
import { CmsPageSection } from "@/components/CmsPageSection";
import { breadcrumbSchema, jsonLd, seoMeta, serviceSchema } from "@/lib/seo";

const serviceImages: Record<string, string> = {
  "interior-designing":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565597706-v79n92-45282663_389168768288928_8373255957228027904_n.jpg",
  "3d-design-visualization":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565707546-o7ekkl-487006160_1835359443669846_5010012192749288785_n.jpg",
  "house-planning":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565708886-bjofq5-486523916_1835359240336533_4783075265497774724_n.jpg",
  "concept-drawings":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565678780-tjhx0l-486459842_1835358983669892_1545320130660225109_n__1_.jpg",
  "boq-estimation":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565585171-hmadct-69522738_547357532470050_7986397365135212544_n.jpg",
  "fit-out-works":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565583070-5edqso-69823596_547357839136686_7766305631522258944_n.jpg",
  "office-interiors":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/1779564014284-dr1pxl-84056007_657103451495457_3057895184357392384_n.jpg",
  "commercial-interiors":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565663842-rfk117-45301754_389167901622348_3229823481130516480_n.jpg",
  "customized-furniture":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/1779563281742-gtra53-150449385_1899567890184442_6502514476577355847_n.jpg",
  "renovation-contracting":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565676746-8z7c84-36032453_304210380118101_6270314289773412352_n.jpg",
  "ceiling-partition":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565582086-alnger-70849714_547358065803330_151406221478330368_n.jpg",
  "flooring-solutions":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565602820-dcf4rf-45249923_389168251622313_6503404269461307392_n.jpg",
  "retail-showroom":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/1779563282485-ixluqi-149670528_1899567963517768_3332778329962980850_n.jpg",
  "hospitality-interiors":
    "https://inxzujmtwxulnawzfelc.supabase.co/storage/v1/object/public/project-media/gallery/1779565596923-a72d6w-45383136_389168851622253_3094791556180213760_n.jpg",
};

export const Route = createFileRoute("/services")({
  head: () => ({
    ...seoMeta({
      title: "Interior Designing & Contracting Services Sri Lanka | DELIFE",
      description:
        "Explore services by DELIFE Interior Designing and Contracting including interior designing, 3D visualization, house planning, BOQ estimation, fit-out works, ceiling, partitions, flooring, renovation and custom furniture.",
      canonical: "/services",
    }),
    scripts: [
      jsonLd(serviceSchema()),
      jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])),
    ],
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
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">Interior Designing & Contracting Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">From the first concept sketch to final handover, every service is delivered by skilled in-house teams with attention to detail.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.slug} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--section)]">
                <img
                  src={serviceImages[s.slug]}
                  alt={`${brand.name} ${s.title} Sri Lanka`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-display text-xs text-[color:var(--gold)] shadow-card">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl text-foreground">{s.title}</h2>
                <p className="mt-2 min-h-20 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <a href={waLink(`Hi DELIFE, I'd like to inquire about ${s.title}.`)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  Inquire on WhatsApp -&gt;
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-[color:var(--section)] p-8 text-center shadow-card sm:p-12">
          <h2 className="font-display text-2xl sm:text-3xl">Have a project in mind?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Send us a quick brief and we'll respond with a clear plan and an indicative estimate.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">Get a Free Consultation</Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

      <CmsPageSection slug="services" />
    </>
  );
}
