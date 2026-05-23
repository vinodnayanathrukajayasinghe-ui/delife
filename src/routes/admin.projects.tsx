import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});

function AdminProjects() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const q = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from("projects").insert({
        title: "Untitled project",
        slug: `untitled-project-${Date.now()}`,
        status: "completed",
        featured: false,
        published: false,
        display_order: 0,
      }).select("id").single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      navigate({ to: "/admin/projects/$id", params: { id } });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public-projects"] });
    },
  });

  if (pathname !== "/admin/projects") {
    return <Outlet />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add and edit portfolio projects, gallery, and before/after images.</p>
        </div>
        <button
          onClick={() => create.mutate()}
          disabled={create.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> New project
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Published</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {q.isLoading && (<tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Loading...</td></tr>)}
            {q.isError && (<tr><td colSpan={5} className="p-6 text-center text-destructive">{q.error.message}</td></tr>)}
            {q.data?.length === 0 && (<tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No projects yet. Click "New project".</td></tr>)}
            {q.data?.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-muted-foreground">/{p.slug}</div>
                </td>
                <td className="p-3">{p.category ?? "-"}</td>
                <td className="p-3 capitalize">{p.status}</td>
                <td className="p-3">{p.published ? "Yes" : "No"}</td>
                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <Link to="/admin/projects/$id" params={{ id: p.id }} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                    <button
                      onClick={() => { if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id); }}
                      className="inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-card px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
