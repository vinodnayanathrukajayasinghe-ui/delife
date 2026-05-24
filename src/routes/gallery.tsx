import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { brand, galleryCategories, galleryItems } from "@/lib/site";
import { CmsPageSection } from "@/components/CmsPageSection";

const galleryQuery = queryOptions({
  queryKey: ["gallery-images"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("published", true)
      .order("display_order")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export const Route = createFileRoute("/gallery")({
  loader: ({ context }) => context.queryClient.fetchQuery(galleryQuery),
  head: () => ({
    meta: [
      { title: `Gallery | ${brand.name}` },
      { name: "description", content: "Visual gallery of interiors, construction, office, residential, commercial, 3D designs, furniture and renovations by DELIFE Interior Pvt Ltd." },
      { property: "og:title", content: `Gallery | ${brand.name}` },
      { property: "og:description", content: "DELIFE Interior project gallery." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { data: dbItems } = useSuspenseQuery(galleryQuery);
  const [cat, setCat] = useState("All");
  const dbCategories = Array.from(new Set(dbItems.map((i) => i.category).filter(Boolean))) as string[];
  const categories = dbItems.length > 0 ? ["All", ...dbCategories] : galleryCategories;
  const items = dbItems.length > 0
    ? (cat === "All" ? dbItems : dbItems.filter((i) => i.category === cat))
    : (cat === "All" ? galleryItems : galleryItems.filter((i) => i.cat === cat));

  return (
    <main>
      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />Gallery<span className="h-px w-8 bg-[color:var(--gold)]" />
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Project Visuals</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">Curated photography from interiors, construction, fit-out, furniture and 3D design projects.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item: any, i) => {
            const src = item.url ?? item.src;
            const caption = item.caption ?? item.cat;
            return (
              <figure key={item.id ?? `${src}-${i}`} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card">
                <img src={src} alt={caption ?? "Gallery image"} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                {caption && <figcaption className="px-4 py-3 text-sm font-semibold">{caption}</figcaption>}
              </figure>
            );
          })}
        </div>
      </section>
      <CmsPageSection slug="gallery" />
    </main>
  );
}
