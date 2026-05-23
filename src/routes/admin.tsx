import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, LayoutDashboard, Briefcase, Mail, Settings } from "lucide-react";
import { brand } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { signOut } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Admin · ${brand.name}` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      // Verify admin role via RLS-protected query
      const { data: row, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      if (error || !row) {
        setForbidden(true);
        setReady(true);
        return;
      }
      setEmail(data.session.user.email ?? null);
      setReady(true);
    };
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate({ to: "/login" });
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (!ready) {
    return <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Checking access…</div>;
  }

  if (forbidden) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-2xl">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but does not have admin access. Ask a site administrator to grant the admin role to your account.
          </p>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/login" }); }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/projects", label: "Projects", icon: Briefcase },
    { to: "/admin/leads", label: "Leads", icon: Mail },
    { to: "/admin/settings", label: "Site Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--section)]">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={brand.logoIcon} alt="" className="h-9 w-9" />
            <span className="font-display text-lg">Admin Console</span>
          </Link>
          <div className="flex items-center gap-3">
            {email && <span className="hidden text-xs text-muted-foreground sm:inline">{email}</span>}
            <button
              onClick={async () => { await signOut(); navigate({ to: "/login" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-px mx-auto max-w-7xl py-6">
        <nav className="mb-6 flex flex-wrap gap-2">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                <n.icon className="h-3.5 w-3.5" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
