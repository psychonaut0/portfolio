import type { MetadataRoute } from "next";
import { listProjects } from "@/lib/content/projects";

const SITE_URL = "https://portfolio.ncsp.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/projects", "/cv"];
  const projectRoutes = listProjects().map((p) => `/projects/${p.slug}`);
  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
}
