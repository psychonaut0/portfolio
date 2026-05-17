import { meta as infra } from "./infra.mdx";
import { meta as portfolio } from "./portfolio.mdx";
import { meta as cvRenderer } from "./cv-renderer.mdx";

export type ProjectMeta = {
  title: string;
  slug: string;
  summary: string;
  stack: string[];
  role: string;
  year: number;
  order: number;
  featured: boolean;
  repo?: string;
  demo?: string;
};

// Casts: MDX files aren't in the tsc compile graph, so typos in their `meta` objects
// don't fail type-check. The smoke test (Task 15) catches missing/malformed fields
// via undefined rendering. Add a runtime validator here if the project count grows.
export const projects: ProjectMeta[] = [
  infra as ProjectMeta,
  portfolio as ProjectMeta,
  cvRenderer as ProjectMeta,
];
