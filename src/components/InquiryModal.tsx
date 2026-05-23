import { useState } from "react";
import { X, Send } from "lucide-react";
import { contact } from "@/lib/site";

export function InquiryModal({ open, onClose, source = "whatsapp_inquiry" as const, title = "Send your inquiry" }: {
  open: boolean;
  onClose: () => void;
  source?: "whatsapp_inquiry" | "contact_form";
  title?: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "Could not send");
      // Then open WhatsApp with the same message
      const msg = `Hello DELIFE,%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email)}%0A%0A${encodeURIComponent(form.message)}`;
      window.open(`https://wa.me/${contact.whatsapp}?text=${msg}`, "_blank");
      onClose();
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (e: any) {
      setErr(e?.message ?? "Could not send");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-elegant" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="font-display text-xl">{title}</h2>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">We'll receive your inquiry and follow up shortly. Continuing also opens WhatsApp.</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          <div className="grid grid-cols-2 gap-3">
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</p>}
          {/* honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
          <button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-card disabled:opacity-60" style={{ backgroundColor: "#25D366" }}>
            <Send className="h-4 w-4" /> {busy ? "Sending…" : "Send & open WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
