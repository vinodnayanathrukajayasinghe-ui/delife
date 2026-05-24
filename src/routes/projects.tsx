import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { listPublicProjects } from "@/lib/projects.functions";
import { brand } from "@/lib/site";
import { CmsPageSection } from "@/components/CmsPageSection";
import {
  projectCategories,
  projectCompletion,
  projectCover,
  projectStatusLabel,
  projectSummary,
  projectTitle,
} from "@/lib/project-view";

const projectsQuery = queryOptions({
  queryKey: ["public-projects"],
  queryFn: () => listPublicProjects(),
});

export const Route = createFileRoute("/projects")({
  loader: ({ context }) => context.queryClient.fetchQuery(projectsQuery),
  head: () => ({
    meta: [
      { title: `Projects | ${brand.name}` },
      { name: "description", content: "Selected interior, fit-out, commercial, corporate, hospitality and construction projects by DELIFE Interior Pvt Ltd in Sri Lanka." },
      { property: "og:title", content: `Projects | ${brand.name}` },
      { property: "og:description", content: "Featured DELIFE Interior project portfolio." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const [cat, setCat] = useState("All");
  const categories = projectCategories(projects);
  const filtered = cat === "All" ? projects : projects.filter((p) => p.category === cat);

  if (pathname !== "/projects") {
    return <Outlet />;
  }

  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto max-w-7xl py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />Portfolio<span className="h-px w-8 bg-[color:var(--gold)]" />
          </div>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">Our Projects</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">A selection of completed and ongoing work across residential, commercial, corporate and hospitality sectors.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={projectCover(p)} alt={projectTitle(p)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${p.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {projectStatusLabel(p)}
                </span>
              </div>
              <div className="p-5">
                {p.category && <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">{p.category}</div>}
                <h2 className="mt-1 font-display text-lg leading-tight">{projectTitle(p)}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{[p.location, projectCompletion(p)].filter(Boolean).join(" · ")}</p>
                {projectSummary(p) && <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{projectSummary(p)}</p>}
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">View Project <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && <p className="mt-10 text-center text-sm text-muted-foreground">No projects in this category yet.</p>}
      </section>

      <CmsPageSection slug="projects" />
    </>
  );
}
