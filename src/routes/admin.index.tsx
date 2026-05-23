import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Briefcase, Mail, Image as ImageIcon, ArrowRight } from "lucide-react";
import { adminListProjects } from "@/lib/projects.functions";
import { adminListLeads } from "@/lib/leads.functions";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const listProjects = useServerFn(adminListProjects);
  const listLeads = useServerFn(adminListLeads);
  const projects = useQuery({ queryKey: ["admin", "projects"], queryFn: () => listProjects() });
  const leads = useQuery({ queryKey: ["admin", "leads"], queryFn: () => listLeads() });

  const newLeads = (leads.data ?? []).filter((l) => l.status === "new").length;

  const stats = [
    { label: "Projects", value: projects.data?.length ?? 0, icon: Briefcase, to: "/admin/projects" as const },
    { label: "New leads", value: newLeads, icon: Mail, to: "/admin/leads" as const },
    { label: "Total leads", value: leads.data?.length ?? 0, icon: ImageIcon, to: "/admin/leads" as const },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your portfolio and review incoming inquiries.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <s.icon className="h-4 w-4 text-[color:var(--gold)]" />
            </div>
            <div className="mt-2 font-display text-3xl text-primary">{s.value}</div>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">Manage <ArrowRight className="h-3 w-3" /></div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-card">
        Tip: visit <span className="font-semibold text-foreground">Site Settings</span> to update your contact details, hero copy and the email address that receives new lead notifications.
      </div>
    </div>
  );
}
