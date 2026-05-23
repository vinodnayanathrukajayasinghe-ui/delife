import type { Tables } from "@/integrations/supabase/types";

export type ProjectRow = Tables<"projects">;
export type ProjectImageRow = Tables<"project_images">;

export const fallbackProjectCover =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80";

export function projectCover(project: Pick<ProjectRow, "cover_image_url">) {
  return project.cover_image_url || fallbackProjectCover;
}

export function projectTitle(project: Pick<ProjectRow, "title">) {
  return project.title;
}

export function projectStatusLabel(project: Pick<ProjectRow, "status">) {
  return project.status.charAt(0).toUpperCase() + project.status.slice(1);
}

export function projectCompletion(project: Pick<ProjectRow, "completion_date" | "year">) {
  if (project.year) return String(project.year);
  if (project.completion_date) return new Date(project.completion_date).getFullYear().toString();
  return "TBA";
}

export function projectSummary(project: Pick<ProjectRow, "summary" | "description">) {
  return project.summary || project.description || "";
}

export function projectCategories(projects: Array<Pick<ProjectRow, "category">>) {
  const categories = projects
    .map((project) => project.category)
    .filter((category): category is string => Boolean(category));
  return ["All", ...Array.from(new Set(categories))];
}

export function projectGallery(images: ProjectImageRow[], coverUrl: string) {
  const gallery = images.filter((image) => image.kind === "gallery").map((image) => image.url);
  return gallery.length > 0 ? gallery : [coverUrl];
}
