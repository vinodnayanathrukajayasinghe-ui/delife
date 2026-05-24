import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, ExternalLink, Trash2, Pencil } from "lucide-react";
import { adminListPages, adminDeletePage, adminSavePage } from "@/lib/pages.functions";

export const Route = createFileRoute("/admin/pages")({ component: AdminPagesIndex });

function AdminPagesIndex() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const list = useServerFn(adminListPages);
  const save = useServerFn(adminSavePage);
  const del = useServerFn(adminDeletePage);

  const q = useQuery({ queryKey: ["admin", "pages"], queryFn: () => list() });

  const create = useMutation({
    mutationFn: async () =>
      save({ data: { title: "Untitled page", content_html: "<p></p>", published: false, display_order: 0 } }),
    onSuccess: ({ id }) => navigate({ to: "/admin/pages/$id", params: { id } }),
  });

  const createStarterPages = useMutation({
    mutationFn: async () => {
      const starterPages = [
        {
          title: "About DELIFE Interior",
          slug: "about-delife-interior",
          excerpt: "Company overview, values, vision and mission for DELIFE Interior Pvt Ltd.",
          content_html:
            "<h2>Complete interior and contracting partner</h2><p>DELIFE Interior Pvt Ltd delivers interior designing, 3D planning, fit-out works, renovations, construction support, commercial interiors, office interiors, customized furniture and project execution across Sri Lanka.</p><h2>Vision</h2><p>To be a trusted interior design and contracting partner recognized for refined design, reliable execution and spaces that create lasting value.</p><h2>Mission</h2><p>To deliver complete interior and contracting solutions through thoughtful design, accurate planning, quality materials, skilled workmanship and disciplined project management.</p>",
          published: true,
          display_order: 1,
        },
        {
          title: "Interior Design Services",
          slug: "interior-design-services",
          excerpt: "Interior designing, 3D visualization, BOQ, fit-out and renovation services.",
          content_html:
            "<h2>Our services</h2><p>We provide interior designing, 3D design and visualization, house planning, concept drawings, BOQ and estimation, interior fit-out works, office interiors, commercial interiors, customized furniture, renovation and contracting, ceiling and partition works, flooring and hospitality interiors.</p>",
          published: true,
          display_order: 2,
        },
        {
          title: "Quality and Project Delivery",
          slug: "quality-project-delivery",
          excerpt: "How DELIFE manages design, planning, execution, quality control and handover.",
          content_html:
            "<h2>Professional delivery process</h2><p>Every project is planned through consultation, space planning, 3D concepts, estimation, execution and final handover. Our team focuses on practical design, clear documentation, quality workmanship and dependable timelines.</p>",
          published: true,
          display_order: 3,
        },
      ];
      for (const page of starterPages) {
        await save({ data: page });
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "pages"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
      qc.invalidateQueries({ queryKey: ["public-page"] });
    },
  });

  if (pathname !== "/admin/pages") {
    return <Outlet />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage CMS pages with rich content and SEO.</p>
        </div>
        <button
          onClick={() => create.mutate()}
          disabled={create.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> New page
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-card">
        {q.isLoading && <p className="p-5 text-sm text-muted-foreground">Loading…</p>}
        {q.data?.length === 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm text-muted-foreground">No pages yet. Create a blank page or add starter CMS pages for the website.</p>
            <button
              onClick={() => createStarterPages.mutate()}
              disabled={createStarterPages.isPending}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:border-primary hover:text-primary disabled:opacity-60"
            >
              <Plus className="h-3.5 w-3.5" /> {createStarterPages.isPending ? "Creating..." : "Add starter pages"}
            </button>
          </div>
        )}
        <ul className="divide-y divide-border">
          {q.data?.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base text-foreground">{p.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      p.published ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">/p/{p.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                {p.published && (
                  <a
                    href={`/p/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View
                  </a>
                )}
                <Link
                  to="/admin/pages/$id"
                  params={{ id: p.id }}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id);
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-background px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
