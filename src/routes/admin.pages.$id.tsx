import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save, ArrowLeft, ExternalLink } from "lucide-react";
import { adminGetPage, adminSavePage, websitePagePaths } from "@/lib/pages.functions";
import { RichTextEditor } from "@/components/RichTextEditor";

export const Route = createFileRoute("/admin/pages/$id")({ component: AdminPageEdit });

function AdminPageEdit() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const get = useServerFn(adminGetPage);
  const save = useServerFn(adminSavePage);

  const q = useQuery({ queryKey: ["admin", "pages", id], queryFn: () => get({ data: { id } }) });
  const [form, setForm] = useState<any>(null);
  useEffect(() => { if (q.data && !form) setForm(q.data); }, [q.data, form]);

  const mut = useMutation({
    mutationFn: async () => save({ data: { ...form } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "pages"] });
      qc.invalidateQueries({ queryKey: ["admin", "pages", id] });
      qc.invalidateQueries({ queryKey: ["public-page"] });
    },
  });

  if (q.isLoading || !form) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!q.data) {
    return (
      <div>
        <Link to="/admin/pages" className="text-sm text-primary">← Back to pages</Link>
        <p className="mt-4 text-sm text-muted-foreground">Page not found.</p>
      </div>
    );
  }

  const set = (k: string, v: any) => setForm({ ...form, [k]: v });
  const viewHref = form.slug ? (websitePagePaths[form.slug] ?? `/p/${form.slug}`) : "";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/admin/pages" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Pages
          </Link>
          <h1 className="font-display text-2xl">Edit page</h1>
        </div>
        <div className="flex items-center gap-2">
          {form.published && viewHref && (
            <a
              href={viewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" /> View
            </a>
          )}
          <button
            onClick={() => mut.mutate()}
            disabled={mut.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {mut.isPending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <label className="block">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</div>
            <input
              value={form.title ?? ""}
              onChange={(e) => set("title", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-primary"
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</div>
            <textarea
              value={form.excerpt ?? ""}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>

          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</div>
            <RichTextEditor value={form.content_html ?? ""} onChange={(html) => set("content_html", html)} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground">Publish</h2>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={(e) => set("published", e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              Published
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slug</div>
              <input
                value={form.slug ?? ""}
                onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                placeholder="auto from title"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order</div>
              <input
                type="number"
                value={form.display_order ?? 0}
                onChange={(e) => set("display_order", Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground">SEO</h2>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meta title</div>
              <input
                value={form.meta_title ?? ""}
                onChange={(e) => set("meta_title", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meta description</div>
              <textarea
                value={form.meta_description ?? ""}
                onChange={(e) => set("meta_description", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meta keywords</div>
              <textarea
                value={form.meta_keywords ?? ""}
                onChange={(e) => set("meta_keywords", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">OG title</div>
              <input
                value={form.og_title ?? ""}
                onChange={(e) => set("og_title", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">OG description</div>
              <textarea
                value={form.og_description ?? ""}
                onChange={(e) => set("og_description", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">OG image URL</div>
              <input
                value={form.og_image_url ?? ""}
                onChange={(e) => set("og_image_url", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="mt-3 block">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Canonical URL</div>
              <input
                value={form.canonical_url ?? ""}
                onChange={(e) => set("canonical_url", e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}
