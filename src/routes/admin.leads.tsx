import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Phone, Trash2 } from "lucide-react";
import { adminDeleteLead, adminListLeads, adminUpdateLeadStatus } from "@/lib/leads.functions";

export const Route = createFileRoute("/admin/leads")({ component: LeadsInbox });

function LeadsInbox() {
  const qc = useQueryClient();
  const list = useServerFn(adminListLeads);
  const upd = useServerFn(adminUpdateLeadStatus);
  const del = useServerFn(adminDeleteLead);
  const q = useQuery({ queryKey: ["admin", "leads"], queryFn: () => list() });

  const setStatus = useMutation({
    mutationFn: async (v: { id: string; status: "new" | "contacted" | "closed" }) => upd({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "leads"] }),
  });
  const remove = useMutation({
    mutationFn: async (id: string) => del({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "leads"] }),
  });

  return (
    <div>
      <h1 className="font-display text-2xl">Leads</h1>
      <p className="mt-1 text-sm text-muted-foreground">Every contact form submission and WhatsApp inquiry appears here.</p>

      <div className="mt-6 space-y-3">
        {q.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {q.data?.length === 0 && <p className="text-sm text-muted-foreground">No inquiries yet.</p>}
        {q.data?.map((l) => (
          <div key={l.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg">{l.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    l.status === "new" ? "bg-amber-100 text-amber-800"
                    : l.status === "contacted" ? "bg-blue-100 text-blue-800"
                    : "bg-emerald-100 text-emerald-800"
                  }`}>{l.status}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{l.source.replace("_", " ")}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {l.email && <a className="inline-flex items-center gap-1 hover:text-primary" href={`mailto:${l.email}`}><Mail className="h-3 w-3" />{l.email}</a>}
                  {l.phone && <a className="inline-flex items-center gap-1 hover:text-primary" href={`tel:${l.phone}`}><Phone className="h-3 w-3" />{l.phone}</a>}
                  <span>{new Date(l.created_at).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={l.status} onChange={(e) => setStatus.mutate({ id: l.id, status: e.target.value as any })} className="rounded-md border border-border bg-background px-2 py-1 text-xs">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => { if (confirm("Delete this lead?")) remove.mutate(l.id); }} className="inline-flex items-center gap-1 rounded-md border border-destructive/30 px-2.5 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
            {l.subject && <div className="mt-3 text-sm font-semibold">{l.subject}</div>}
            {l.message && <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/85">{l.message}</p>}
            {l.page_url && <div className="mt-2 text-xs text-muted-foreground">From: {l.page_url}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
