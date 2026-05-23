import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Shield, Award, CheckCircle2 } from "lucide-react";
import { listPublicProjects } from "@/lib/projects.functions";
import { projectCover, projectTitle } from "@/lib/project-view";
import { brand, services } from "@/lib/site";

const selectedProjectsQuery = queryOptions({
  queryKey: ["public-projects", "company-profile"],
  queryFn: async () => (await listPublicProjects()).slice(0, 6),
});

export const Route = createFileRoute("/company-profile")({
  loader: ({ context }) => context.queryClient.ensureQueryData(selectedProjectsQuery),
  head: () => ({
    meta: [
      { title: `Company Profile | ${brand.name}` },
      { name: "description", content: "DELIFE Interior Pvt Ltd company profile - overview, vision, mission, services, core strengths, selected projects and quality commitments." },
      { property: "og:title", content: `Company Profile | ${brand.name}` },
      { property: "og:description", content: "Modern web-based company profile for DELIFE Interior Pvt Ltd." },
    ],
    links: [{ rel: "canonical", href: "/company-profile" }],
  }),
  component: CompanyProfile,
});

function CompanyProfile() {
  const { data: projects } = useSuspenseQuery(selectedProjectsQuery);

  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto max-w-7xl py-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
              <span className="h-px w-8 bg-[color:var(--gold)]" />Company Profile
            </div>
            <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">{brand.name}</h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{brand.altPositioning}</p>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl">Overview</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">{brand.name} is a Sri Lanka-based interior designing and contracting company specializing in interior design, 3D visualization, fit-out works, renovations, construction support, commercial interiors, office interiors, customized furniture and project execution.</p>
              <p className="mt-3 leading-relaxed text-foreground/85">We work with residential, commercial and corporate clients to deliver elegant, functional and durable spaces through structured planning, quality workmanship and dependable project coordination.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl">Vision</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">To be a trusted interior design and contracting partner in Sri Lanka, recognized for refined design, reliable execution and spaces that create lasting value for homes, workplaces and commercial environments.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl">Mission</h2>
              <p className="mt-3 leading-relaxed text-foreground/85">To deliver complete interior, fit-out and contracting solutions through thoughtful design, accurate planning, quality materials, skilled workmanship and disciplined project management, ensuring every project is completed with professionalism, attention to detail and dependable timelines.</p>
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
                {projects.map((p) => (
                  <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card">
                    <img src={projectCover(p)} alt={projectTitle(p)} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                    <div className="p-4">
                      {p.category && <div className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--gold)]">{p.category}</div>}
                      <div className="font-display">{projectTitle(p)}</div>
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
          </aside>
        </div>
      </section>
    </>
  );
}
