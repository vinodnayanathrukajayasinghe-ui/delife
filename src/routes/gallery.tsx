import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { brand, galleryCategories, galleryItems } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
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
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? galleryItems : galleryItems.filter((i) => i.cat === cat);

  return (
    <>
      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-px mx-auto max-w-7xl py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">
            <span className="h-px w-8 bg-[color:var(--gold)]" />Gallery<span className="h-px w-8 bg-[color:var(--gold)]" />
          </div>
          <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl md:text-6xl">A look inside our work</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">Curated photography from interiors, construction, fit-out, furniture and 3D design projects.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {galleryCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((it, i) => (
            <figure key={i} className="break-inside-avoid overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <img src={it.src} alt={it.alt} loading="lazy" className="w-full object-cover transition duration-500 hover:scale-[1.02]" />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
