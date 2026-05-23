import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Briefcase, MessageCircle } from "lucide-react";
import type { Project } from "@/lib/site";
import { brand, projects, waLink } from "@/lib/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: [
        { title: `${p?.name ?? "Project"} | ${brand.name}` },
        { name: "description", content: p?.short ?? "" },
        { property: "og:title", content: `${p?.name ?? "Project"} | ${brand.name}` },
        { property: "og:description", content: p?.short ?? "" },
        { property: "og:type", content: "article" },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }, { name: "twitter:image", content: p.cover }] : []),
      ],
      links: p ? [{ rel: "canonical", href: `/projects/${p.slug}` }] : [],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img src={p.cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>
        <div className="container-px mx-auto max-w-7xl py-24">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> All Projects
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">{p.category}</div>
            <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">{p.name}</h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">{p.short}</p>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl">Project Overview</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{p.description}</p>

            <h3 className="mt-10 font-display text-xl">Services Provided</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.servicesProvided.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-[color:var(--gold)]" /> {s}</li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl">Project Gallery</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g, i) => (
                <img key={i} src={g} alt={`${p.name} ${i + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg">Project Details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Location</dt><dd>{p.location}</dd></div></div>
                <div className="flex items-start gap-3"><Briefcase className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Category</dt><dd>{p.category}</dd></div></div>
                <div className="flex items-start gap-3"><Calendar className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Completion</dt><dd>{p.completion}</dd></div></div>
                {p.client && <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Client</dt><dd>{p.client}</dd></div></div>}
                <div className="flex items-start gap-3"><span className={`mt-0.5 inline-block h-2.5 w-2.5 rounded-full ${p.status === "Completed" ? "bg-emerald-500" : "bg-amber-500"}`} /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Status</dt><dd>{p.status}</dd></div></div>
              </dl>
            </div>
            <a href={waLink(`Hi DELIFE, I'd like to discuss a project similar to "${p.name}".`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="h-4 w-4" /> Discuss a similar project
            </a>
            <Link to="/contact" className="flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
              Request a Consultation
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
