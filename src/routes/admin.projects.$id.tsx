import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/projects/$id")({
  component: ProjectEditor,
});

function ProjectEditor() {
  const { id } = Route.useParams();
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["admin", "project", id],
    queryFn: async () => {
      const [{ data: project, error: e1 }, { data: images, error: e2 }] = await Promise.all([
        supabase.from("projects").select("*").eq("id", id).maybeSingle(),
        supabase.from("project_images").select("*").eq("project_id", id).order("display_order"),
      ]);
      if (e1) throw e1;
      if (e2) throw e2;
      return { project, images: images ?? [] };
    },
  });

  const [form, setForm] = useState<any>(null);
  useEffect(() => {
    if (q.data?.project && !form) setForm(q.data.project);
  }, [q.data, form]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        completion_date: form.completion_date || null,
        year: form.year ? Number(form.year) : null,
      };
      const { error } = await supabase.from("projects").update(payload).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "project", id] });
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["public-projects"] });
      qc.invalidateQueries({ queryKey: ["public-project"] });
    },
  });

  const removeImage = useMutation({
    mutationFn: async (imgId: string) => {
      const { error } = await supabase.from("project_images").delete().eq("id", imgId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "project", id] });
      qc.invalidateQueries({ queryKey: ["public-project"] });
    },
  });

  const updateImageAlt = useMutation({
    mutationFn: async ({ imgId, altText }: { imgId: string; altText: string }) => {
      const { error } = await supabase.from("project_images").update({ alt_text: altText || null, caption: altText || null }).eq("id", imgId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "project", id] });
      qc.invalidateQueries({ queryKey: ["public-project"] });
    },
  });

  async function uploadFile(file: File, kind: "cover" | "gallery" | "before" | "after", pairId?: string) {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
    const up = await supabase.storage.from("project-media").upload(path, file, { contentType: file.type });
    if (up.error) throw up.error;
    const { data: pub } = supabase.storage.from("project-media").getPublicUrl(path);
    if (kind === "cover") {
      setForm((f: any) => ({ ...f, cover_image_url: pub.publicUrl }));
    } else {
      const { error } = await supabase.from("project_images").insert({ project_id: id, url: pub.publicUrl, kind, pair_id: pairId });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["admin", "project", id] });
      qc.invalidateQueries({ queryKey: ["public-project"] });
    }
  }

  async function uploadFiles(files: File[], kind: "gallery" | "before" | "after") {
    for (const file of files) {
      await uploadFile(file, kind, kind === "gallery" ? undefined : crypto.randomUUID());
    }
    qc.invalidateQueries({ queryKey: ["admin", "project", id] });
    qc.invalidateQueries({ queryKey: ["public-project"] });
  }

  if (q.isLoading || !form) {
    return <div className="text-sm text-muted-foreground">Loading editor…</div>;
  }

  const gallery = (q.data?.images ?? []).filter((i) => i.kind === "gallery");
  const beforeImgs = (q.data?.images ?? []).filter((i) => i.kind === "before");
  const afterImgs = (q.data?.images ?? []).filter((i) => i.kind === "after");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {save.isPending ? "Saving…" : "Save changes"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Field label="Title">
            <input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug (URL)">
              <input value={form.slug ?? ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto from title" className="input" />
            </Field>
            <Field label="Category">
              <input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" />
            </Field>
            <Field label="Location">
              <input value={form.location ?? ""} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" />
            </Field>
            <Field label="Client">
              <input value={form.client ?? ""} onChange={(e) => setForm({ ...form, client: e.target.value })} className="input" />
            </Field>
          </div>
          <Field label="Short summary">
            <input value={form.summary ?? ""} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="input" />
          </Field>
          <Field label="Full description">
            <textarea rows={6} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
          </Field>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground">Project SEO</h2>
            <div className="mt-3 space-y-4">
              <Field label="Project SEO title">
                <input value={form.seo_title ?? ""} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="input" />
              </Field>
              <Field label="Project meta description">
                <textarea rows={3} value={form.meta_description ?? ""} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} className="input" />
              </Field>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input">
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </Field>
          <Field label="Completion date">
            <input type="date" value={form.completion_date ?? ""} onChange={(e) => setForm({ ...form, completion_date: e.target.value })} className="input" />
          </Field>
          <Field label="Year">
            <input type="number" value={form.year ?? ""} onChange={(e) => setForm({ ...form, year: e.target.value })} className="input" />
          </Field>
          <Field label="Display order">
            <input type="number" value={form.display_order ?? 0} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} className="input" />
          </Field>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover image</div>
            {form.cover_image_url ? (
              <img src={form.cover_image_url} alt="cover" className="mt-2 aspect-[4/3] w-full rounded-lg object-cover" />
            ) : (
              <div className="mt-2 grid aspect-[4/3] w-full place-items-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">No cover yet</div>
            )}
            <FileButton label="Upload cover" onFiles={([f]) => f ? uploadFile(f, "cover") : undefined} />
          </div>
        </div>
      </div>

      <ImageSection title="Gallery" images={gallery} onUpload={(files) => uploadFiles(files, "gallery")} onDelete={(i) => removeImage.mutate(i)} onAltChange={(imgId, altText) => updateImageAlt.mutate({ imgId, altText })} />
      <BeforeAfterSection
        before={beforeImgs}
        after={afterImgs}
        onUpload={(files, kind) => uploadFiles(files, kind)}
        onDelete={(i) => removeImage.mutate(i)}
        onAltChange={(imgId, altText) => updateImageAlt.mutate({ imgId, altText })}
      />

      <style>{`.input{ width:100%; border:1px solid var(--input); background:var(--background); border-radius:.5rem; padding:.65rem .75rem; font-size:.875rem; outline:none; } .input:focus{ border-color: var(--primary); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}

function FileButton({ label, multiple = false, onFiles }: { label: string; multiple?: boolean; onFiles: (files: File[]) => void | Promise<void> }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className={`mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary ${busy ? "opacity-60" : ""}`}>
      <Upload className="h-3 w-3" /> {busy ? "Uploading…" : label}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        multiple={multiple}
        onChange={async (e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length === 0) return;
          setBusy(true);
          try { await onFiles(files); } catch (err: any) { alert(err?.message ?? "Upload failed"); } finally { setBusy(false); e.target.value = ""; }
        }}
      />
    </label>
  );
}

function ImageSection({ title, images, onUpload, onDelete, onAltChange }: { title: string; images: any[]; onUpload: (files: File[]) => Promise<void>; onDelete: (id: string) => void; onAltChange: (id: string, altText: string) => void; }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">{title}</h2>
        <FileButton label="Add images" multiple onFiles={onUpload} />
      </div>
      {images.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">No images yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg border border-border">
              <img src={img.url} alt="" className="aspect-square w-full object-cover" />
              <input
                defaultValue={img.alt_text ?? img.caption ?? ""}
                onBlur={(e) => onAltChange(img.id, e.target.value)}
                placeholder="Image alt text"
                className="w-full border-t border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary"
              />
              <button onClick={() => onDelete(img.id)} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-background/90 text-destructive opacity-0 transition group-hover:opacity-100">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BeforeAfterSection({ before, after, onUpload, onDelete, onAltChange }: { before: any[]; after: any[]; onUpload: (files: File[], kind: "before" | "after") => Promise<void>; onDelete: (id: string) => void; onAltChange: (id: string, altText: string) => void; }) {
  // Group by pair_id; orphans displayed under "Unpaired"
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">Before / After</h2>
        <div className="flex gap-2">
          <FileButton label="Add Before" multiple onFiles={(files) => onUpload(files, "before")} />
          <FileButton label="Add After" multiple onFiles={(files) => onUpload(files, "after")} />
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Column title="Before" images={before} onDelete={onDelete} onAltChange={onAltChange} />
        <Column title="After" images={after} onDelete={onDelete} onAltChange={onAltChange} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Tip: to pair a before and after, upload one of each — they'll appear side by side here.</p>
    </div>
  );
}

function Column({ title, images, onDelete, onAltChange }: { title: string; images: any[]; onDelete: (id: string) => void; onAltChange: (id: string, altText: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      {images.length === 0 ? (
        <p className="text-xs text-muted-foreground">None</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg border border-border">
              <img src={img.url} alt="" className="aspect-square w-full object-cover" />
              <input
                defaultValue={img.alt_text ?? img.caption ?? ""}
                onBlur={(e) => onAltChange(img.id, e.target.value)}
                placeholder="Image alt text"
                className="w-full border-t border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary"
              />
              <button onClick={() => onDelete(img.id)} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-background/90 text-destructive opacity-0 transition group-hover:opacity-100">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
