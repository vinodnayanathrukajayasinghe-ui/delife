import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Shield, Award, CheckCircle2 } from "lucide-react";
import { brand, projects, services } from "@/lib/site";

export const Route = createFileRoute("/company-profile")({
  head: () => ({
    meta: [
      { title: `Company Profile | ${brand.name}` },
      { name: "description", content: "DELIFE Interior Pvt Ltd company profile — overview, vision, mission, services, core strengths, selected projects and quality commitments." },
      { property: "og:title", content: `Company Profile | ${brand.name}` },
      { property: "og:description", content: "Modern web-based company profile for DELIFE Interior Pvt Ltd." },
    ],
    links: [{ rel: "canonical", href: "/company-profile" }],
  }),
  component: CompanyProfile,
});

function CompanyProfile() {
  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto grid max-w-7xl gap-10 py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
              <span className="h-px w-8 bg-[color:var(--gold)]" />Company Profile
            </div>
            <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">{brand.name}</h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{brand.altPositioning}</p>
          </div>
          <a href="/Delife_Interior_Company_Profile.pdf" download className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">
            <Download className="h-4 w-4" /> Download Company Profile PDF
          </a>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-2xl">Overview</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{brand.name} is a Sri Lanka–based interior designing and contracting company specializing in interior design, 3D visualization, fit-out works, renovations, construction support, commercial interiors, office interiors, customized furniture and project execution.</p>
              <p className="mt-3 leading-relaxed text-foreground/85">We work with residential, commercial and corporate clients to deliver elegant, functional and durable spaces with quality workmanship, professional planning and timely delivery.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl">Vision</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">To become a trusted and recognized interior designing and contracting company in Sri Lanka, delivering elegant, functional and high-quality spaces that inspire people, support businesses and create long-term value.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl">Mission</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">To provide complete interior designing and contracting solutions through creative design concepts, accurate planning, quality materials, skilled workmanship and reliable project management — completing every project with professionalism, attention to detail, timely execution and complete customer satisfaction.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl">Our Services</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" /> {s.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl">Selected Projects</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {projects.slice(0, 6).map((p) => (
                  <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card">
                    <img src={p.cover} alt={p.name} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                    <div className="p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--gold)]">{p.category}</div>
                      <div className="font-display">{p.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
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
            <a href="/Delife_Interior_Company_Profile.pdf" download className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">
              <Download className="h-4 w-4" /> Download Profile
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
