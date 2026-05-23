import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about-us", "/services", "/projects", "/gallery", "/company-profile", "/contact"];
        const { data: projects, error } = await supabaseAdmin
          .from("projects")
          .select("slug")
          .eq("published", true)
          .order("display_order")
          .order("created_at", { ascending: false });
        if (error) throw new Error(error.message);
        const projectPaths = projects.map((p) => `/projects/${p.slug}`);
        const all = [...staticPaths, ...projectPaths];
        const urls = all.map(
          (path) =>
            `  <url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.7"}</priority></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
