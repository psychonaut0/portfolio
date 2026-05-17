# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v1 portfolio site as specified in `docs/superpowers/specs/2026-05-17-portfolio-design.md` — a Next.js 16 App Router site with `/`, `/projects`, `/projects/[slug]`, `/cv`, and 404, content-driven from a typed profile module and MDX project files.

**Architecture:** Static-rendered Next.js 16 App Router pages composed from small presentational components. Profile/experience copy lives in a single typed module (`content/profile.ts`); projects live as MDX files with a `meta` export, registered in a hand-maintained manifest. A pure-function loader sits between the manifest and the routes; pages have no `fs` access.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, `@next/mdx` family, Vitest (loader tests only), ImageMagick (one-shot OG image generation).

---

## Reference

- **Spec:** `docs/superpowers/specs/2026-05-17-portfolio-design.md`
- **Source-of-truth CV copy:** `~/Documents/personal/knowledge/wiki/sources/cv-eu.md` (verbatim profile statement + experience bullets — do not paraphrase).
- **Next.js docs (NOT the Next you know):** `node_modules/next/dist/docs/01-app/02-guides/mdx.md`, `01-getting-started/14-metadata-and-og-images.md`, `03-api-reference/03-file-conventions/`.
- **Existing infra (do not modify):** `Dockerfile`, `compose.yml`, `.github/workflows/`, `pnpm-lock.yaml` semantics (pinned to pnpm 9.15.9).
- **NDA:** No project page may derive from Travelware internal work. Travelware appears only in `content/profile.ts` experience bullets.

## File structure (target)

```
app/
  layout.tsx               # rewritten: keep Geist, replace metadata with site defaults
  page.tsx                 # rewritten: composed home
  not-found.tsx            # new
  sitemap.ts               # new
  robots.ts                # new
  projects/
    page.tsx               # new
    [slug]/
      page.tsx             # new
  cv/
    page.tsx               # new
mdx-components.tsx         # new — required by @next/mdx
components/
  hero.tsx                 # new
  profile-statement.tsx    # new
  project-card.tsx         # new
  experience-list.tsx      # new
  experience-item.tsx      # new
  contact-list.tsx         # new
  prose-layout.tsx         # new
  footer.tsx               # new
content/
  profile.ts               # new — typed Profile object
  projects/
    index.ts               # new — manifest + ProjectMeta type
    portfolio.mdx          # new
    cv-renderer.mdx        # new
lib/
  content/
    projects.ts            # new — listProjects / listFeaturedProjects / getProjectMeta
    projects.test.ts       # new — loader tests
public/
  og-default.png           # new — one-shot generated via magick
  cv-eu.pdf                # copied from cv repo if available, else absent (link 404s in v1)
next.config.ts             # modified — withMDX + pageExtensions
app/globals.css            # modified — rewritten palette, Arial line removed
package.json               # modified — MDX + Vitest deps, test script
docs/superpowers/plans/2026-05-17-portfolio.md  # this file
```

---

## Task 1: Install MDX + Vitest deps and configure MDX

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Install MDX packages**

Run:

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

Expected: lockfile updates, no scripts run (pnpm `onlyBuiltDependencies` already pinned).

- [ ] **Step 2: Install Vitest**

Run:

```bash
pnpm add -D vitest
```

Expected: vitest in `devDependencies`.

- [ ] **Step 3: Add the `test` script**

Edit `package.json` `scripts` to add:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run"
}
```

- [ ] **Step 4: Update `next.config.ts` to use MDX**

Replace the entire file with:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 5: Create the required `mdx-components.tsx` shim**

Create `mdx-components.tsx` at the project root (NOT inside `app/`):

```tsx
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

This is a stub; component mappings land in Task 8.

- [ ] **Step 6: Verify the scaffold still builds**

Run:

```bash
pnpm build
```

Expected: build completes; the existing `app/page.tsx` still renders the placeholder. No MDX content yet, so MDX wiring is exercised but inert.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml next.config.ts mdx-components.tsx
git commit -m "build: enable @next/mdx and add vitest dev dep"
```

---

## Task 2: Rewrite `globals.css` to the spec palette and update the root layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite `app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

:root {
  --background: #fafafa;
  --foreground: #171717;
  --muted: #737373;
  --accent: #2563eb;
  --hairline: #e5e5e5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #f5f5f5;
    --muted: #a3a3a3;
    --accent: #60a5fa;
    --hairline: #262626;
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-hairline: var(--hairline);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), system-ui, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
```

Why: spec § 6.2. The Arial fallback is gone. Variables map to Tailwind v4 colors so `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-hairline` all work in JSX.

- [ ] **Step 2: Rewrite `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://portfolio.ncsp.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Francesco Barbano — Senior Full-Stack Engineer",
    template: "%s · Francesco Barbano",
  },
  description:
    "Senior full-stack engineer building distributed travel-tech systems and AI-augmented developer workflows. Italy, open to EU remote.",
  openGraph: {
    title: "Francesco Barbano — Senior Full-Stack Engineer",
    description:
      "Senior full-stack engineer building distributed travel-tech systems and AI-augmented developer workflows.",
    url: SITE_URL,
    siteName: "Francesco Barbano",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    locale: "en",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev server renders without errors**

Run:

```bash
pnpm dev
```

Visit `http://localhost:3000`. Expected: existing placeholder home renders against the new palette; no font/CSS errors in the terminal. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "style: rewrite palette, fix Arial fallback, set site metadata defaults"
```

---

## Task 3: Author `content/profile.ts` from CV verbatim

**Files:**
- Create: `content/profile.ts`

Source of truth for profile copy is `~/Documents/personal/knowledge/wiki/sources/cv-eu.md` (§ Profile statement, § Experience). Do not paraphrase.

- [ ] **Step 1: Create `content/profile.ts`**

```ts
export type LinkKind = "email" | "linkedin" | "github" | "cv";

export type Link = {
  kind: LinkKind;
  label: string;
  href: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  start: string;       // "Aug 2024"
  end: string | null;  // null = present
  bullets: string[];
  current?: boolean;
};

export type CareerBreak = {
  period: string;
  label: string;
};

export type Profile = {
  name: string;
  roleLabel: string;
  location: string;
  stackLine: string;
  profileStatement: string;
  links: Link[];
  experience: ExperienceEntry[];
  careerBreaks?: CareerBreak[];
};

export const profile: Profile = {
  name: "Francesco Barbano",
  roleLabel: "Senior Full-Stack Engineer",
  location: "Italy · open to EU remote",
  stackLine:
    "TypeScript · React · Next.js · Node · PostgreSQL · AWS · AI-augmented dev workflows",
  profileStatement:
    "Senior full-stack engineer with 5+ years building and shipping web applications in React/Next.js and Node.js. Cut time-to-market by 75% at a digital agency. Currently designing distributed architectures at scale and building custom tooling and AI-augmented workflows to automate development operations across travel, transportation, and digital media.",
  links: [
    {
      kind: "email",
      label: "work.francescobarbano@pm.me",
      href: "mailto:work.francescobarbano@pm.me",
    },
    {
      kind: "linkedin",
      label: "linkedin.com/in/francesco-barbano",
      href: "https://www.linkedin.com/in/francesco-barbano",
    },
    {
      kind: "github",
      label: "github.com/psychonaut0",
      href: "https://github.com/psychonaut0",
    },
    {
      kind: "cv",
      label: "CV (PDF)",
      href: "/cv",
    },
  ],
  experience: [
    {
      role: "Senior Full-Stack Software Developer",
      company: "Travelware",
      start: "Aug 2024",
      end: null,
      current: true,
      bullets: [
        "Scalable travel platform, 6-engineer team, Next.js with distributed microservices (REST + WebSockets) across 10+ repositories.",
        "Interactive map module: real-time rendering of millions of geographic records via PostGIS spatial indexing + query tuning.",
        "PostgreSQL schema architecture with Prisma, across hundreds of tables.",
        "Automated data import pipelines — onboarding latency days → hours.",
        "AWS migration: ECS for container orchestration, Cognito for auth.",
        "Custom CLI + AI-augmented workflows: gitflow ops, code review, query optimization, cross-repo maintenance.",
      ],
    },
    {
      role: "Full-Stack / DevOps Developer",
      company: "Mexage",
      start: "Mar 2023",
      end: "Aug 2024",
      bullets: [
        "5+ web applications for train operations management + IoT monitoring (MQTT-based: city-wide smart waste sensors, SIM-based smart intercoms). Used daily by hundreds of users.",
        "Linux sysadmin across 10+ servers; CI/CD pipelines; shell automation.",
        "30+ Docker containers via Docker Compose + Portainer.",
        "Code reviews + mentorship to juniors.",
        "Deployment scripts reducing manual errors.",
      ],
    },
    {
      role: "Frontend Web Developer",
      company: "Nois3",
      start: "Apr 2021",
      end: "Oct 2022",
      bullets: [
        "4 responsive websites on existing design systems.",
        "Introduced a modern React/Next.js stack that cut time-to-market from 1.5+ months to ~2 weeks (75% reduction).",
        "Full-featured CMS integrated with Figma via custom plugin — automated design-to-code workflow.",
      ],
    },
  ],
  careerBreaks: [
    {
      period: "Oct 2022 – Mar 2023",
      label: "Career break for professional development.",
    },
  ],
};
```

- [ ] **Step 2: Type-check**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content/profile.ts
git commit -m "feat(content): add typed profile with CV-verbatim copy"
```

---

## Task 4: Author project MDX files and the manifest

**Files:**
- Create: `content/projects/portfolio.mdx`
- Create: `content/projects/cv-renderer.mdx`
- Create: `content/projects/index.ts`

- [ ] **Step 1: Create `content/projects/portfolio.mdx`**

```mdx
export const meta = {
  title: "Portfolio site",
  slug: "portfolio",
  summary:
    "Next.js 16 standalone build, multi-stage Dockerfile, GHCR CI, deployed to the home-lab fleet.",
  stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Docker", "GHCR", "MDX"],
  role: "Solo",
  year: 2026,
  order: 20,
  featured: true,
  repo: "https://github.com/psychonaut0/portfolio",
  demo: "https://portfolio.ncsp.dev",
};

This site. A statically rendered Next.js 16 App Router app, built to a standalone Node bundle, packaged as a small Alpine image, and deployed to my home-lab fleet via GHCR.

## Problem

I needed a public surface that matches the CV — a senior full-stack engineer with an AI-tooling specialisation — and that I could keep maintaining for the next several years without trend-chasing. The previous version (`portfolio.sniffer.zip`) wasn't honest about the current stack and didn't have room for project case studies.

## Approach

The site is content-first: a single typed module for profile/experience copy, MDX files for each project, and a hand-maintained manifest so the loader is a pure function over a static array. Pages are server-rendered with zero client JS by default; the only dynamic-feeling thing is the system-pref colour scheme switch via CSS variables.

The container build is multi-stage on `node:22-alpine`: deps install in one stage, the standalone output is produced in a builder stage, the runner stage copies only `.next/standalone`, `.next/static`, and `public/` into a non-root image. CI on push to `main` builds and pushes `:latest` + `:sha-<short>` to GHCR; tagged releases push `:vX.Y.Z`. Deploy is pinned by image tag in a separate infra repo.

## Stack

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind v4` · `@next/mdx` · `Docker (multi-stage)` · `GHCR` · `GitHub Actions`

## Outcome

The site builds in under a minute, the image is a few tens of megabytes, the home page ships effectively no client JS. New project case studies are a one-file change (`content/projects/<slug>.mdx`) plus a one-line manifest entry.
```

- [ ] **Step 2: Create `content/projects/cv-renderer.mdx`**

```mdx
export const meta = {
  title: "CV renderer",
  slug: "cv-renderer",
  summary:
    "One-page EU/IT CV rendered from hand-maintained HTML to PDF with WeasyPrint, built and versioned alongside the source.",
  stack: ["HTML", "CSS", "WeasyPrint", "Python", "Bash"],
  role: "Solo",
  year: 2026,
  order: 10,
  featured: true,
};

A small dual-language CV pipeline: two parallel single-file HTML documents (`cv-eu.html`, `cv-it.html`) rendered to A4 PDFs by WeasyPrint, with both source and built PDFs checked in so the source-of-truth stays consistent.

## Problem

I rewrite my CV often enough that maintaining it in a Word/Pages file felt wrong, but most "developer CV" templates over-engineer the build (full LaTeX, Tailwind-in-Puppeteer, single-page React) and produce documents that look like a developer ran a build for them. I wanted plain HTML, semantic markup, real typography, and a one-step `./build.sh` to produce both language variants.

## Approach

`@page { size: A4; margin: 0 }` plus a fixed `.page` width drives WeasyPrint's pagination — the document is designed to fit on a single A4 page, so any added content has to be offset by trimming elsewhere. Icons are inline SVGs (Feather set for contact, brand marks for LinkedIn/GitHub) so there are no external image dependencies at build time except Google Fonts (DM Sans titles, Lato body). Each language variant is hand-maintained — any content change to one almost always requires a mirrored change to the other; diverged-on-purpose lines (GDPR clause, unit suffixes, English-level phrasing) live in a small table in the README.

## Stack

`HTML` · `CSS (print)` · `WeasyPrint` · `Python` · `Bash`

## Outcome

`./build.sh` produces both PDFs in a few seconds. The repo is small enough that the editorial decisions log (which metrics to keep vs. drop, framing of team role, "AI-augmented" wording, no formal degree disclosure) sits alongside the source as `README.md § Review Decisions`.
```

- [ ] **Step 3: Create `content/projects/index.ts`**

```ts
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
```

- [ ] **Step 4: Type-check (project metas conform)**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: no errors. If MDX type resolution complains, ensure `@types/mdx` is installed (Task 1) and that `tsconfig.json`'s `include` covers `**/*.mts` (it already does — MDX files are loaded by the bundler, not typed directly; the manifest's array literal does the type assertion).

- [ ] **Step 5: Commit**

```bash
git add content/projects/
git commit -m "feat(content): add portfolio + cv-renderer MDX with manifest"
```

---

## Task 5: Project content loader with TDD

**Files:**
- Create: `lib/content/projects.test.ts`
- Create: `lib/content/projects.ts`

- [ ] **Step 1: Write the failing tests**

Create `lib/content/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  listProjects,
  listFeaturedProjects,
  getProjectMeta,
} from "./projects";

describe("listProjects", () => {
  it("returns all projects sorted by order desc, then year desc", () => {
    const all = listProjects();
    expect(all.length).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < all.length - 1; i++) {
      const a = all[i];
      const b = all[i + 1];
      if (a.order !== b.order) {
        expect(a.order).toBeGreaterThan(b.order);
      } else {
        expect(a.year).toBeGreaterThanOrEqual(b.year);
      }
    }
  });
});

describe("listFeaturedProjects", () => {
  it("returns only featured projects, in the same order as listProjects", () => {
    const featured = listFeaturedProjects();
    expect(featured.every((p) => p.featured)).toBe(true);
    const allFeatured = listProjects().filter((p) => p.featured);
    expect(featured.map((p) => p.slug)).toEqual(allFeatured.map((p) => p.slug));
  });
});

describe("getProjectMeta", () => {
  it("returns the matching project", () => {
    const p = getProjectMeta("portfolio");
    expect(p?.slug).toBe("portfolio");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectMeta("does-not-exist")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```bash
pnpm test
```

Expected: FAIL — `Cannot find module './projects'` or similar (the implementation file doesn't exist yet).

- [ ] **Step 3: Implement the loader**

Create `lib/content/projects.ts`:

```ts
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
```

- [ ] **Step 4: Run tests and verify they pass**

Run:

```bash
pnpm test
```

Expected: all 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/content/projects.ts lib/content/projects.test.ts
git commit -m "feat(content): add project loader with sort + lookup tests"
```

---

## Task 6: Page-shared components (Hero, ProfileStatement, ContactList, Footer)

**Files:**
- Create: `components/hero.tsx`
- Create: `components/profile-statement.tsx`
- Create: `components/contact-list.tsx`
- Create: `components/footer.tsx`

These are small, pure presentational components. No tests — the value is in the page composition (manually smoke-tested at the end).

- [ ] **Step 1: Create `components/hero.tsx`**

```tsx
type HeroProps = {
  name: string;
  roleLabel: string;
  location: string;
  stackLine: string;
};

export function Hero({ name, roleLabel, location, stackLine }: HeroProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
      <p className="text-lg text-foreground">{roleLabel}</p>
      <p className="text-sm text-muted">{location}</p>
      <p className="font-mono text-sm text-muted pt-2">{stackLine}</p>
    </header>
  );
}
```

- [ ] **Step 2: Create `components/profile-statement.tsx`**

```tsx
type ProfileStatementProps = {
  children: React.ReactNode;
};

export function ProfileStatement({ children }: ProfileStatementProps) {
  return <p className="text-base leading-relaxed">{children}</p>;
}
```

- [ ] **Step 3: Create `components/contact-list.tsx`**

```tsx
import type { Link as ProfileLink } from "@/content/profile";

type ContactListProps = {
  links: ProfileLink[];
};

export function ContactList({ links }: ContactListProps) {
  return (
    <ul className="font-mono text-sm space-y-1">
      {links.map((link) => (
        <li key={link.kind}>
          <span className="text-muted">{link.kind}</span>
          <span className="text-muted"> · </span>
          <a
            href={link.href}
            className="underline decoration-hairline underline-offset-4 hover:decoration-accent"
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Create `components/footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="mt-24 pt-6 border-t border-hairline text-xs text-muted font-mono">
      <p>© {new Date().getFullYear()} Francesco Barbano</p>
    </footer>
  );
}
```

- [ ] **Step 5: Type-check**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/hero.tsx components/profile-statement.tsx components/contact-list.tsx components/footer.tsx
git commit -m "feat(components): add Hero, ProfileStatement, ContactList, Footer"
```

---

## Task 7: Experience components

**Files:**
- Create: `components/experience-item.tsx`
- Create: `components/experience-list.tsx`

- [ ] **Step 1: Create `components/experience-item.tsx`**

```tsx
import type { ExperienceEntry } from "@/content/profile";

type ExperienceItemProps = {
  entry: ExperienceEntry;
};

export function ExperienceItem({ entry }: ExperienceItemProps) {
  const range = `${entry.start} – ${entry.end ?? "present"}`;
  return (
    <article className="space-y-2">
      <header className="space-y-0.5">
        <h3 className="font-medium">
          {entry.role}
          <span className="text-muted"> · </span>
          <span>{entry.company}</span>
        </h3>
        <p className="font-mono text-xs text-muted">{range}</p>
      </header>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {entry.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 2: Create `components/experience-list.tsx`**

```tsx
import type { CareerBreak, ExperienceEntry } from "@/content/profile";
import { ExperienceItem } from "./experience-item";

type ExperienceListProps = {
  entries: ExperienceEntry[];
  careerBreaks?: CareerBreak[];
};

export function ExperienceList({ entries, careerBreaks }: ExperienceListProps) {
  return (
    <div className="space-y-8">
      {entries.map((e) => (
        <ExperienceItem key={`${e.company}-${e.start}`} entry={e} />
      ))}
      {careerBreaks?.map((b) => (
        <p key={b.period} className="text-sm text-muted">
          <span className="font-mono text-xs">{b.period}</span>
          <span> — </span>
          <span>{b.label}</span>
        </p>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/experience-item.tsx components/experience-list.tsx
git commit -m "feat(components): add ExperienceItem and ExperienceList"
```

---

## Task 8: Project + prose components

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/prose-layout.tsx`

Note on `mdx-components.tsx`: it stays as the empty-`components` stub created in Task 1. `ProseLayout` does the MDX styling at the route boundary so MDX-inserted React components (if any are added later) don't have to know about it. The file remains because `@next/mdx` requires it.

- [ ] **Step 1: Create `components/project-card.tsx`**

```tsx
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content/projects";

type ProjectCardProps = {
  project: ProjectMeta;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="space-y-3 border-t border-hairline pt-6">
      <header className="space-y-1">
        <h3 className="font-medium">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted">{project.summary}</p>
      </header>
      <ul className="font-mono text-xs text-muted flex flex-wrap gap-x-3 gap-y-1">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="font-mono text-xs flex flex-wrap gap-x-4 gap-y-1">
        <Link
          href={`/projects/${project.slug}`}
          className="text-accent hover:underline"
        >
          Read →
        </Link>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            repo ↗
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            demo ↗
          </a>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `components/prose-layout.tsx`**

```tsx
type ProseLayoutProps = {
  children: React.ReactNode;
};

export function ProseLayout({ children }: ProseLayoutProps) {
  return (
    <div className="space-y-4 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_code]:font-mono [&_code]:text-sm [&_a]:underline [&_a]:decoration-hairline [&_a]:underline-offset-4 hover:[&_a]:decoration-accent">
      {children}
    </div>
  );
}
```

Why one-shot arbitrary selectors instead of a typography plugin: the Tailwind v4 typography plugin isn't in the dep list (YAGNI), and the styling surface for MDX is small enough to inline.

- [ ] **Step 3: Type-check**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/project-card.tsx components/prose-layout.tsx
git commit -m "feat(components): add ProjectCard and ProseLayout"
```

---

## Task 9: Home page (`/`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { ProfileStatement } from "@/components/profile-statement";
import { ProjectCard } from "@/components/project-card";
import { ExperienceList } from "@/components/experience-list";
import { ContactList } from "@/components/contact-list";
import { Footer } from "@/components/footer";
import { profile } from "@/content/profile";
import { listFeaturedProjects } from "@/lib/content/projects";

export default function Home() {
  const featured = listFeaturedProjects();
  return (
    <main className="mx-auto w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 space-y-12">
      <Hero
        name={profile.name}
        roleLabel={profile.roleLabel}
        location={profile.location}
        stackLine={profile.stackLine}
      />
      <ProfileStatement>{profile.profileStatement}</ProfileStatement>
      <section aria-labelledby="projects-heading" className="space-y-6">
        <h2 id="projects-heading" className="text-xs font-mono uppercase tracking-wider text-muted">
          Selected projects
        </h2>
        <div className="space-y-6">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <section aria-labelledby="experience-heading" className="space-y-6">
        <h2 id="experience-heading" className="text-xs font-mono uppercase tracking-wider text-muted">
          Experience
        </h2>
        <ExperienceList
          entries={profile.experience}
          careerBreaks={profile.careerBreaks}
        />
      </section>
      <section aria-labelledby="contact-heading" className="space-y-4">
        <h2 id="contact-heading" className="text-xs font-mono uppercase tracking-wider text-muted">
          Contact
        </h2>
        <ContactList links={profile.links} />
      </section>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and visually check `/`**

Run:

```bash
pnpm dev
```

Visit `http://localhost:3000`. Expected:
- Hero at top, name + role + location + stack line.
- Profile statement paragraph.
- Two project cards (Portfolio site, CV renderer) with "Read →" links.
- Three experience entries (Travelware, Mexage, Nois3) with bullets + dates.
- Career break line under experience.
- Contact list (email, linkedin, github, cv).
- Footer with © year + name.

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): compose / from profile and featured projects"
```

---

## Task 10: Projects index (`/projects`)

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create `app/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { listProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default function ProjectsPage() {
  const all = listProjects();
  return (
    <main className="mx-auto w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted">
          Things I&apos;ve built. Newer work first.
        </p>
      </header>
      <div className="space-y-6">
        {all.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and visually check `/projects`**

Run:

```bash
pnpm dev
```

Visit `http://localhost:3000/projects`. Expected: page heading + lede + the same two project cards in order (portfolio first via `order: 20`, then cv-renderer via `order: 10`).

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat(projects): add /projects index"
```

---

## Task 11: Project detail (`/projects/[slug]`)

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProseLayout } from "@/components/prose-layout";
import { getProjectMeta, listProjects } from "@/lib/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return listProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const meta = getProjectMeta(slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.summary,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const meta = getProjectMeta(slug);
  if (!meta) notFound();

  const { default: Body } = await import(`@/content/projects/${slug}.mdx`);

  return (
    <main className="mx-auto w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 space-y-10">
      <p className="font-mono text-xs">
        <Link href="/projects" className="text-muted hover:text-accent">
          ← projects
        </Link>
      </p>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="text-sm text-muted">{meta.summary}</p>
        <ul className="font-mono text-xs text-muted flex flex-wrap gap-x-3 gap-y-1 pt-1">
          {meta.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </header>
      <ProseLayout>
        <Body />
      </ProseLayout>
      <footer className="font-mono text-xs text-muted space-y-1">
        <p>
          {meta.role} · {meta.year}
        </p>
        <div className="flex flex-wrap gap-x-4">
          {meta.repo && (
            <a href={meta.repo} target="_blank" rel="noreferrer" className="hover:text-accent">
              repo ↗
            </a>
          )}
          {meta.demo && (
            <a href={meta.demo} target="_blank" rel="noreferrer" className="hover:text-accent">
              demo ↗
            </a>
          )}
        </div>
      </footer>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and visually check both detail pages**

Run:

```bash
pnpm dev
```

Visit:
- `http://localhost:3000/projects/portfolio` — full MDX renders; `← projects` back-link works.
- `http://localhost:3000/projects/cv-renderer` — same, no `repo`/`demo` links (cv-renderer omits them).
- `http://localhost:3000/projects/nonexistent-slug` — should hit `notFound()` (Next renders the closest 404; we add a custom one in Task 12).

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/projects/[slug]/page.tsx
git commit -m "feat(projects): add /projects/[slug] case-study route"
```

---

## Task 12: CV page and 404

**Files:**
- Create: `app/cv/page.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create `app/cv/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "CV",
  description: "Downloadable EU one-pager CV.",
};

export default function CVPage() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-6 md:px-8 py-16 md:py-24 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">CV</h1>
        <p className="text-sm text-muted">
          EU-style one-pager. Senior full-stack engineer, 5+ years.
        </p>
      </header>
      <p className="font-mono text-sm">
        <a
          href="/cv-eu.pdf"
          className="underline decoration-hairline underline-offset-4 hover:decoration-accent"
        >
          Download CV (PDF) ↗
        </a>
      </p>
      <p className="font-mono text-sm">
        <Link href="/" className="text-muted hover:text-accent">
          ← home
        </Link>
      </p>
      <Footer />
    </main>
  );
}
```

Note: if `public/cv-eu.pdf` is not yet present, the link 404s. The PDF is placed in Task 14.

- [ ] **Step 2: Create `app/not-found.tsx`**

```tsx
import Link from "next/link";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-6 md:px-8 py-24 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Not found</h1>
      <p className="text-sm text-muted">
        That page doesn&apos;t exist (yet).
      </p>
      <p className="font-mono text-sm">
        <Link href="/" className="text-muted hover:text-accent">
          ← home
        </Link>
      </p>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
pnpm dev
```

Visit:
- `http://localhost:3000/cv` — CV page renders, download link present.
- `http://localhost:3000/projects/nope` — custom 404 renders.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/cv/page.tsx app/not-found.tsx
git commit -m "feat(routes): add /cv and custom 404"
```

---

## Task 13: Sitemap, robots, OG image

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `public/og-default.png`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
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
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://portfolio.ncsp.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Generate `public/og-default.png` with ImageMagick**

Run:

```bash
magick -size 1200x630 canvas:'#0a0a0a' \
  -font DejaVu-Sans-Bold -pointsize 64 -fill '#fafafa' -gravity center \
  -annotate +0-40 'Francesco Barbano' \
  -font DejaVu-Sans -pointsize 36 -fill '#a3a3a3' \
  -annotate +0+40 'Senior Full-Stack Engineer' \
  public/og-default.png
```

Expected: file written. Verify:

```bash
file public/og-default.png
```

Expected output (substring): `PNG image data, 1200 x 630`.

If `DejaVu-Sans-Bold` is not registered as that exact name, run `magick -list font | grep -i dejavu` and substitute the closest match (`DejaVu-Sans`, `Helvetica`, etc.). The literal font choice doesn't matter for v1 — the image is replaceable later.

- [ ] **Step 4: Verify sitemap + robots build correctly**

Run:

```bash
pnpm build
```

Expected: build completes; `.next/server/app/sitemap.xml.body` and `.next/server/app/robots.txt.body` exist (Next generates these at build time for file conventions).

Spot-check via:

```bash
pnpm start &
sleep 2
curl -fsS http://localhost:3000/sitemap.xml | head -20
curl -fsS http://localhost:3000/robots.txt
kill %1
```

Expected: sitemap lists `/`, `/projects`, `/cv`, `/projects/portfolio`, `/projects/cv-renderer`; robots allows all and references `/sitemap.xml`.

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts public/og-default.png
git commit -m "feat(seo): add sitemap, robots, and static OG image"
```

---

## Task 14: Copy CV PDF if available

**Files:**
- Create (conditional): `public/cv-eu.pdf`

The `cv` repo lives at `~/Documents/personal/projects/cv` and is built via `./build.sh eu` (per its CLAUDE.md). If a built `cv-eu.pdf` is present in that repo, copy it. Otherwise, skip — the `/cv` page download link will 404 until the file is added, which is acceptable for v1.

- [ ] **Step 1: Check for the built CV PDF**

Run:

```bash
ls ~/Documents/personal/projects/cv/cv-eu.pdf 2>/dev/null && echo "found" || echo "missing"
```

If `found`: continue to Step 2.
If `missing`: try `(cd ~/Documents/personal/projects/cv && ./build.sh eu)` if WeasyPrint is installed; otherwise skip to Step 3 and document the gap in the commit message.

- [ ] **Step 2: Copy the PDF**

Run:

```bash
cp ~/Documents/personal/projects/cv/cv-eu.pdf public/cv-eu.pdf
file public/cv-eu.pdf
```

Expected (substring): `PDF document`.

- [ ] **Step 3: Commit**

If the PDF was copied:

```bash
git add public/cv-eu.pdf
git commit -m "chore(cv): copy cv-eu.pdf from cv repo build output"
```

If skipped:

```bash
git commit --allow-empty -m "chore(cv): defer cv-eu.pdf — /cv download link will 404 until added"
```

---

## Task 15: Final smoke test + Docker build verification

**Files:** none (verification only)

- [ ] **Step 1: Full test pass**

Run:

```bash
pnpm test
```

Expected: all loader tests pass.

- [ ] **Step 2: Lint**

Run:

```bash
pnpm lint
```

Expected: no errors. Warnings are tolerable but report any.

- [ ] **Step 3: Type-check**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Production build**

Run:

```bash
pnpm build
```

Expected:
- Build completes without errors.
- Output includes `.next/standalone/` (standalone output).
- Route list shows: `/`, `/projects`, `/projects/[slug]` (with 2 prerendered params), `/cv`, `/sitemap.xml`, `/robots.txt`, `/_not-found`.
- All routes marked as static (○) — none as dynamic (ƒ).

- [ ] **Step 5: Production smoke run**

Run:

```bash
pnpm start &
sleep 2
curl -fsS http://localhost:3000/ | grep -F "Francesco Barbano" >/dev/null && echo "/ ok"
curl -fsS http://localhost:3000/projects | grep -F "Projects" >/dev/null && echo "/projects ok"
curl -fsS http://localhost:3000/projects/portfolio | grep -F "Portfolio site" >/dev/null && echo "/projects/portfolio ok"
curl -fsS http://localhost:3000/projects/cv-renderer | grep -F "CV renderer" >/dev/null && echo "/projects/cv-renderer ok"
curl -fsS http://localhost:3000/cv | grep -F "Download CV" >/dev/null && echo "/cv ok"
curl -fsS -o /dev/null -w "%{http_code}\n" http://localhost:3000/projects/nope | grep -F "404" && echo "/404 ok"
curl -fsS -o /dev/null -w "%{http_code}\n" http://localhost:3000/og-default.png | grep -F "200" && echo "/og-default.png ok"
kill %1
```

Expected: all checks print `... ok`.

- [ ] **Step 6: Docker build verification**

Run:

```bash
docker compose build
docker compose up -d
sleep 3
curl -fsS http://localhost:3000/ | grep -F "Francesco Barbano" >/dev/null && echo "container ok"
docker compose down
```

Expected: image builds successfully on `node:22-alpine`, container serves the site, healthcheck passes (compose.yml uses 127.0.0.1).

- [ ] **Step 7: Browser visual review**

Run `pnpm dev`, open `http://localhost:3000` in a browser, verify by eye:

- Hero, profile statement, two project cards, three experience entries, career break, contact list, footer all present.
- Light mode (default) and dark mode (toggle OS pref) both legible; underlines use the hairline tone with accent on hover.
- Layout caps around 720px, generous vertical rhythm.
- No console errors, no hydration mismatches.
- `/projects/portfolio` MDX prose styled (headings sized, lists bulleted, links underlined).

Stop the dev server.

- [ ] **Step 8: Lighthouse check (optional but recommended)**

Open Chrome DevTools → Lighthouse → run on `/` with mobile + desktop. Expected: ≥95 in all four categories; 100 is the target on Accessibility, Best Practices, SEO.

Note any < 95 score and decide: address now if cheap (e.g. missing `lang`, missing `<title>`), or document as a follow-up.

- [ ] **Step 9: Final commit (if any uncommitted)**

If any incidental changes were made during smoke testing:

```bash
git status
git add -p   # interactively stage only the intended fixes
git commit -m "chore(portfolio): minor smoke-test fixes"
```

Otherwise, nothing to commit — the site is ready to push.

---

## Notes for the implementer

- **Order matters between tasks 4 and 5** — the loader tests in Task 5 assume the manifest from Task 4 already exists with `portfolio` and `cv-renderer` slugs and matching `order`/`year` values.
- **Next.js 16 `params`** are a `Promise` in route handlers — do not destructure synchronously. The route file in Task 11 shows the awaited form.
- **`dynamicParams = false`** on `/projects/[slug]` means any unknown slug 404s at build time. If the manifest grows or shrinks, rerun `pnpm build` to refresh `generateStaticParams`.
- **Tailwind v4 colour vars** are pulled in via `@theme inline` in `globals.css` — adding new colours requires both a CSS var on `:root` and a mapping under `@theme inline`.
- **MDX named exports** (`export const meta = {...}`) are first-class ES module exports; the manifest in Task 4 imports them with standard `import { meta } from "./file.mdx"` syntax. If TypeScript complains about resolving `.mdx`, `@types/mdx` (installed in Task 1) provides the ambient declaration.
- **No tests for components / pages** by design — the spec doesn't require them, and the smoke checklist in Task 15 covers presentational regressions.
