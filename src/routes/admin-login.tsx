import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { brand } from "@/lib/site";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/admin-login")({
  head: () => ({
    meta: [
      { title: `Admin Login | ${brand.name}` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (login(u, p)) {
      navigate({ to: "/admin" });
    } else {
      setErr("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="grid min-h-[80vh] place-items-center bg-[color:var(--section)] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant">
        <div className="flex flex-col items-center text-center">
          <img src={brand.logoIcon} alt="" className="h-16 w-16 object-contain" />
          <h1 className="mt-4 font-display text-2xl">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Restricted area · authorized personnel only</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Username</label>
            <input value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" required className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
            <input type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" required className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</p>}
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95">
            <LogIn className="h-4 w-4" /> Sign in
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Secure access
        </div>
      </div>
    </div>
  );
}
