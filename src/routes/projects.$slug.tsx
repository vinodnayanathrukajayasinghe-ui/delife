import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Briefcase, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { getPublicProjectBySlug } from "@/lib/projects.functions";
import { brand, waLink } from "@/lib/site";
import {
  projectCompletion,
  projectCover,
  projectGallery,
  projectStatusLabel,
  projectSummary,
  projectTitle,
} from "@/lib/project-view";

const projectQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public-project", slug],
    queryFn: () => getPublicProjectBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(projectQuery(params.slug));
    if (!data?.project) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const cover = p ? projectCover(p) : "";
    const title = `${p ? projectTitle(p) : "Project"} | ${brand.name}`;
    const description = p ? projectSummary(p) : "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(cover ? [{ property: "og:image", content: cover }, { name: "twitter:image", content: cover }] : []),
      ],
      links: p ? [{ rel: "canonical", href: `/projects/${p.slug}` }] : [],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectQuery(slug));
  if (!data?.project) return null;

  const p = data.project;
  const cover = projectCover(p);
  const gallery = projectGallery(data.images, cover);
  const before = data.images.filter((image) => image.kind === "before");
  const after = data.images.filter((image) => image.kind === "after");

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img src={cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        </div>
        <div className="container-px mx-auto max-w-7xl py-24">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> All Projects
          </Link>
          <div className="mt-6 max-w-3xl">
            {p.category && <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">{p.category}</div>}
            <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">{projectTitle(p)}</h1>
            {projectSummary(p) && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{projectSummary(p)}</p>}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl">Project Overview</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{p.description || p.summary || "Project details will be added soon."}</p>

            <h3 className="mt-10 font-display text-xl">Project Gallery</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {gallery.map((url, i) => (
                <img key={`${url}-${i}`} src={url} alt={`${projectTitle(p)} ${i + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
              ))}
            </div>

            {(before.length > 0 || after.length > 0) && (
              <>
                <h3 className="mt-10 font-display text-xl">Before / After</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {before.map((image) => (
                    <figure key={image.id}>
                      <img src={image.url} alt={`${projectTitle(p)} before`} className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
                      <figcaption className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Before</figcaption>
                    </figure>
                  ))}
                  {after.map((image) => (
                    <figure key={image.id}>
                      <img src={image.url} alt={`${projectTitle(p)} after`} className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
                      <figcaption className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">After</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg">Project Details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {p.location && <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Location</dt><dd>{p.location}</dd></div></div>}
                {p.category && <div className="flex items-start gap-3"><Briefcase className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Category</dt><dd>{p.category}</dd></div></div>}
                <div className="flex items-start gap-3"><Calendar className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Completion</dt><dd>{projectCompletion(p)}</dd></div></div>
                {p.client && <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Client</dt><dd>{p.client}</dd></div></div>}
                <div className="flex items-start gap-3"><span className={`mt-0.5 inline-block h-2.5 w-2.5 rounded-full ${p.status === "completed" ? "bg-emerald-500" : "bg-amber-500"}`} /><div><dt className="text-xs uppercase tracking-wider text-muted-foreground">Status</dt><dd>{projectStatusLabel(p)}</dd></div></div>
              </dl>
            </div>
            <a href={waLink(`Hi DELIFE, I'd like to discuss a project similar to "${projectTitle(p)}".`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-card hover:opacity-95" style={{ backgroundColor: "#25D366" }}>
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
