import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { brand } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: `Sign in | ${brand.name}` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate({ to: "/admin" });
    } catch (e: any) {
      setErr(e?.message || "Invalid credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-[80vh] place-items-center bg-[color:var(--section)] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant">
        <div className="flex flex-col items-center text-center">
          <img src={brand.logoIcon} alt="" className="h-16 w-16 object-contain" />
          <h1 className="mt-4 font-display text-2xl">Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">Restricted area · authorized personnel only</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</p>}
          <button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60">
            <LogIn className="h-4 w-4" /> {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Secured by Supabase Auth
        </div>
      </div>
    </div>
  );
}
