import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard, FileText, Briefcase, Image as ImageIcon, Settings, Users, Mail } from "lucide-react";
import { brand, projects, services } from "@/lib/site";
import { isAuthed, logout } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Admin · ${brand.name}` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthed()) navigate({ to: "/admin-login" });
    else setReady(true);
  }, [navigate]);

  if (!ready) return null;

  const stats = [
    { label: "Projects", value: projects.length, icon: Briefcase },
    { label: "Services", value: services.length, icon: FileText },
    { label: "Gallery items", value: 16, icon: ImageIcon },
    { label: "Inquiries", value: 0, icon: Mail },
  ];

  const sections = [
    { title: "Home page content", desc: "Hero, highlights and CTA editor." },
    { title: "About / Vision / Mission", desc: "Update company story and values." },
    { title: "Services manager", desc: "Add, edit, reorder or remove services." },
    { title: "Projects manager", desc: "Manage projects, categories and gallery." },
    { title: "Gallery manager", desc: "Upload and categorize gallery images." },
    { title: "Company Profile PDF", desc: "Replace the downloadable PDF." },
    { title: "Contact details", desc: "Phone, email, address and hours." },
    { title: "WhatsApp number", desc: "Update the WhatsApp inquiry number." },
    { title: "Social links", desc: "Edit Facebook and social profile URLs." },
    { title: "SEO manager", desc: "Per-page titles, descriptions, OG tags." },
    { title: "Testimonials", desc: "Manage client testimonials." },
    { title: "Logo & favicon", desc: "Update brand assets." },
    { title: "Inquiries", desc: "View and respond to submissions." },
    { title: "Password", desc: "Change your admin password." },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--section)]">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={brand.logoIcon} alt="" className="h-9 w-9" />
            <span className="font-display text-lg">Admin Console</span>
          </Link>
          <button
            onClick={() => { logout(); navigate({ to: "/admin-login" }); }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="container-px mx-auto max-w-7xl py-10">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <h1 className="font-display text-2xl">Dashboard</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back. Manage your website content from one place.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                <Icon className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="mt-2 font-display text-3xl text-primary">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            <h2 className="font-display text-xl">Manage content</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <div key={s.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-display text-base">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                <button disabled className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
                  Connect backend to enable
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground shadow-card">
            <Users className="mt-0.5 h-4 w-4 text-primary" />
            <p>Editing actions require a backend (database + file storage + auth). Enable Lovable Cloud and ask to wire up the admin CMS — projects, services, gallery uploads, contact details and SEO will all become editable from this console.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
