import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const qc = useQueryClient();
  const [category, setCategory] = useState("Interior Projects");
  const q = useQuery({
    queryKey: ["admin", "gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const upload = useMutation({
    mutationFn: async (files: File[]) => {
      for (const file of files) {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
        const up = await supabase.storage.from("project-media").upload(path, file, { contentType: file.type });
        if (up.error) throw up.error;
        const { data: pub } = supabase.storage.from("project-media").getPublicUrl(path);
        const { error } = await supabase.from("gallery_images").insert({
          url: pub.publicUrl,
          category,
          caption: category,
          published: true,
          display_order: 0,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery-images"] });
      qc.invalidateQueries({ queryKey: ["gallery-images"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery-images"] });
      qc.invalidateQueries({ queryKey: ["gallery-images"] });
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload 20-30 project images at once and publish them to the website gallery.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary" />
          <label className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95 ${upload.isPending ? "opacity-60" : ""}`}>
            <Upload className="h-4 w-4" /> {upload.isPending ? "Uploading..." : "Upload images"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                if (files.length > 30) {
                  alert("Please upload 30 images or fewer at once.");
                  e.target.value = "";
                  return;
                }
                if (files.length > 0) upload.mutate(files);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </div>

      {q.isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading...</p>}
      {q.isError && <p className="mt-6 text-sm text-destructive">{q.error.message}</p>}
      {q.data?.length === 0 && (
        <div className="mt-8 grid min-h-60 place-items-center rounded-xl border border-dashed border-border bg-card text-center">
          <div>
            <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No gallery images yet.</p>
          </div>
        </div>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {q.data?.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-lg border border-border bg-card">
            <img src={img.url} alt={img.caption ?? ""} className="aspect-square w-full object-cover" />
            <div className="p-3 text-xs font-semibold">{img.category ?? "Gallery"}</div>
            <button onClick={() => remove.mutate(img.id)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-destructive opacity-0 transition group-hover:opacity-100">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
