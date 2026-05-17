import { describe, expect, it, vi } from "vitest";
import type { ProjectMeta } from "@/content/projects";

// Mock the manifest so vitest doesn't try to resolve the transitively-imported
// .mdx files (vitest has no MDX loader configured, and we don't need one to
// unit-test the pure sort/filter/find logic).
vi.mock("@/content/projects", () => {
  const projects: ProjectMeta[] = [
    {
      title: "Alpha",
      slug: "alpha",
      summary: "",
      stack: [],
      role: "Solo",
      year: 2024,
      order: 10,
      featured: true,
    },
    {
      title: "Beta",
      slug: "beta",
      summary: "",
      stack: [],
      role: "Solo",
      year: 2025,
      order: 20,
      featured: false,
    },
    {
      title: "Gamma",
      slug: "gamma",
      summary: "",
      stack: [],
      role: "Solo",
      year: 2026,
      order: 10,
      featured: true,
    },
  ];
  return { projects };
});

import {
  listProjects,
  listFeaturedProjects,
  getProjectMeta,
} from "./projects";

describe("listProjects", () => {
  it("returns all projects sorted by order desc, then year desc", () => {
    const all = listProjects();
    expect(all.map((p) => p.slug)).toEqual(["beta", "gamma", "alpha"]);
  });

  it("does not mutate the source array", () => {
    const first = listProjects();
    const second = listProjects();
    expect(first).not.toBe(second);
    expect(first.map((p) => p.slug)).toEqual(second.map((p) => p.slug));
  });
});

describe("listFeaturedProjects", () => {
  it("returns only featured projects, in the same order as listProjects", () => {
    const featured = listFeaturedProjects();
    expect(featured.map((p) => p.slug)).toEqual(["gamma", "alpha"]);
    expect(featured.every((p) => p.featured)).toBe(true);
  });
});

describe("getProjectMeta", () => {
  it("returns the matching project", () => {
    const p = getProjectMeta("alpha");
    expect(p?.slug).toBe("alpha");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectMeta("does-not-exist")).toBeUndefined();
  });
});
