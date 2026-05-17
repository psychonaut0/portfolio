import { projects, type ProjectMeta } from "@/content/projects";

export type { ProjectMeta };

export function listProjects(): ProjectMeta[] {
  return [...projects].sort((a, b) => {
    if (a.order !== b.order) return b.order - a.order;
    return b.year - a.year;
  });
}

export function listFeaturedProjects(): ProjectMeta[] {
  return listProjects().filter((p) => p.featured);
}

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
