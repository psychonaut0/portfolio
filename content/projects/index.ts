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

export const projects: ProjectMeta[] = [portfolio, cvRenderer];
