# Portfolio site — design spec

> Personal portfolio at `portfolio.ncsp.dev`. Next.js 16 (App Router, standalone output), already containerised and deployed via GHCR to the home-lab fleet. This spec defines the content shape, routes, components, and visual system; deploy/CI is already done and out of scope.

## 1. Purpose and audience

The site is a hiring-funnel conversion asset for an EU-remote senior full-stack job search, per `wiki/projects/employment-travelware.md` § Recommended path. It is not a vanity site or a sandbox.

**Primary user**: an EU-remote technical recruiter doing a 30-second scan after seeing the link on LinkedIn or GitHub. They must, within 30 seconds, see:

1. Name + senior-full-stack framing + stack labels.
2. A current-role one-liner that matches the CV ("AI-augmented dev workflows", PostGIS at scale, microservices).
3. A visible "Featured projects" surface.

**Secondary user**: a hiring engineering manager doing a 5-minute deep-read after the recruiter forwards the link. They must be able to read at least one project case-study end-to-end (problem / approach / stack / outcome) and reach the GitHub and CV.

**Tertiary user**: Francesco himself. The site is his face on the internet long-term; the visual system and architecture must age without forced refreshes.

Success criteria:

- A recruiter who lands on `/` should be able to articulate the senior-FS + AI-tooling positioning without scrolling.
- The site should not contribute to the Pool-A signals catalogued in the wiki (no Linux-hobbyist or audio-driver framing; no "🏗️ Psychonaut" persona).
- A LinkedIn "Featured" link can target a deep, self-contained project page (not just the homepage).
- Site continues to build and deploy through the existing Docker / GHCR pipeline without changes.

## 2. Constraints

- **NDA**: the Travelware contract assigns IP broadly and forbids disclosing internal product details. Travelware appears on the site as work experience using CV-verbatim bullets only. No screenshots of the internal product, no architecture diagrams that map onto internal systems, no code excerpts from internal repos.
- **Next.js 16 conventions**: this is not the Next.js the agent was trained on. All new code must follow the bundled docs in `node_modules/next/dist/docs/`.
- **Existing infra**: Dockerfile (multi-stage standalone), `compose.yml`, GHCR push workflow, and tsconfig are already in place and out of scope. The spec must not require changes to deploy.
- **Standalone output**: `next.config.ts` exports `output: "standalone"`. MDX and any new tooling must be compatible with standalone build.
- **No analytics, no fonts beyond what's already loaded (Geist Sans + Geist Mono via `next/font`)** in v1. Adding a tracker is a separate decision.
- **Hand-written content only** in v1. No CMS, no DB, no remote fetch.

## 3. Routes

| Route | Purpose | Render |
|---|---|---|
| `/` | Landing — hero, profile statement, featured projects, experience, contact | Static |
| `/projects` | Index of all projects (cards) | Static |
| `/projects/[slug]` | Project case study (MDX content) | Static (`generateStaticParams` + `dynamicParams: false`) |
| `/cv` | Page linking to the downloadable PDF (built by the `cv` repo, copied into `public/`) | Static |
| `not-found` | 404 | Static |

Out of scope for v1: `/writing`, `/uses`, `/now`, RSS. The content loader is designed so `/writing` can be added without restructuring (see § 5).

## 4. Page content

### 4.1 `/` (Home)

Sections, top to bottom:

1. **Hero**: name (`Francesco Barbano`), role label (`Senior Full-Stack Engineer`), one-line location/availability (`Italy · open to EU remote`), and a single stack line (`TypeScript · React · Next.js · Node · PostgreSQL · AWS · AI-augmented dev workflows`). No avatar, no illustration.
2. **Profile statement**: the CV's verbatim paragraph. Single paragraph, no bullet list. Used as a hook into the rest of the page.
3. **Selected projects**: 2–3 project cards (title, one-line summary, stack chips, "Read →" deep-link to `/projects/[slug]`, optional repo/demo links). Drives clicks into `/projects/[slug]` for the case-study read. v1 surfaces the projects that exist honestly today (see § 4.3); the surface is designed to absorb the 3 Pool-B repos as they land.
4. **Experience**: terse, current role expanded. Travelware → Mexage → Nois3 with month-precision dates. Career-break (Oct 2022 – Mar 2023) included as a one-liner per CV ingest note. Each entry: role, company, date range, 2–4 bullet outcomes (CV verbatim).
5. **Contact**: email (`work.francescobarbano@pm.me`), LinkedIn (`linkedin.com/in/francesco-barbano`), GitHub (`github.com/psychonaut0`), CV PDF link.

### 4.2 `/projects` and `/projects/[slug]`

`/projects` lists all projects (cards reuse the same card component used on `/`). Default order: explicit `order` field in each project's frontmatter, descending; ties broken by `year`.

`/projects/[slug]` renders the project's MDX with this structure (prose-imposed, not enforced by code):

- H1 = project title.
- Lede paragraph (one sentence: what it is, why it exists).
- **Problem** — what was the constraint or opportunity.
- **Approach** — the technical decisions and tradeoffs, written as prose, not bullets.
- **Stack** — short list of tech used (also surfaced as chips in the header).
- **Outcome** — measurable result if available; honest framing otherwise.
- **Links** — repo, demo, related writing.

The page also renders a top "back to /projects" affordance and footer-style metadata (year, role).

### 4.3 Initial project set (v1)

Honest current-state — projects that can be shipped today without NDA risk:

- **Portfolio site itself**: meta-project. Next.js 16 standalone, multi-stage Docker, GHCR CI, deployed to the home-lab fleet. Lets the case-study mode show the actual tooling choices and infra reasoning.
- **CV renderer (`cv` repo)**: WeasyPrint-driven dual-language one-page CV, mirrored EN/IT, build script, PDF checked in alongside HTML. Niche but well-executed, signals taste for tooling and reproducibility.

These two are enough for v1. Each of the three Pool-B repos from the wiki's GitHub fix-list lands as an additional `/projects/[slug]` page when it exists. Adding a project is a one-MDX-file change plus one line in the manifest (§ 5.2).

### 4.4 `/cv`

Minimal page: a heading, one paragraph framing the CV (EU one-pager), a download button linking to `/cv-eu.pdf` in `public/`, and — only if the `cv` repo is public — an optional "View source on GitHub" link. The PDF is copied into `public/` by hand from `cv` repo build output for v1 — automating this is out of scope.

## 5. Content model

### 5.1 Profile (typed, single file)

`content/profile.ts` exports one typed object:

```ts
export type Link = { label: string; href: string; kind: 'email' | 'linkedin' | 'github' | 'cv' };
export type ExperienceEntry = {
  role: string;
  company: string;
  start: string;     // "Aug 2024"
  end: string | null; // null = present
  bullets: string[];
  current?: boolean;
};
export type Profile = {
  name: string;
  roleLabel: string;          // "Senior Full-Stack Engineer"
  location: string;           // "Italy · open to EU remote"
  stackLine: string;          // hero stack line
  profileStatement: string;   // CV verbatim paragraph
  links: Link[];
  experience: ExperienceEntry[];
  careerBreaks?: { period: string; label: string }[]; // e.g. Oct 2022 – Mar 2023
};
```

Single source of truth for hero/contact/experience copy. Kept in sync with the `cv` repo by hand; mismatch is acceptable in the short term but flagged in the project log.

### 5.2 Projects (MDX + manifest)

Each project is `content/projects/<slug>.mdx`. The MDX file exports a `meta` object alongside its default JSX content:

```mdx
export const meta = {
  title: 'Portfolio site',
  slug: 'portfolio',
  summary: 'Next.js 16 + standalone Docker + GHCR, deployed to the home-lab fleet.',
  stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Docker', 'GHCR'],
  role: 'Solo',
  year: 2026,
  order: 10,
  featured: true,
  repo: 'https://github.com/psychonaut0/portfolio',
  demo: 'https://portfolio.ncsp.dev',
};

# Portfolio site

Lede paragraph…
```

A hand-maintained manifest at `content/projects/index.ts` re-exports each project's `meta`:

```ts
import { meta as portfolio } from './portfolio.mdx';
import { meta as cv } from './cv-renderer.mdx';
export const projects = [portfolio, cv] as const;
```

Why hand-maintained: explicit, no `fs` access at build time inside the app code, type-checks at compile time, easy to reorder, total cost is one line per project. Three projects.

### 5.3 Content loader

`lib/content/projects.ts`:

```ts
export type ProjectMeta = { /* mirrors the MDX-exported meta */ };
export function listProjects(): ProjectMeta[];          // ordered, all
export function listFeaturedProjects(): ProjectMeta[];  // featured only, ordered
export function getProjectMeta(slug: string): ProjectMeta | undefined;
```

Pure functions over the static `projects` array — no `fs`, no `async`, no caching. The MDX component itself is loaded via `import('@/content/projects/${slug}.mdx')` in the route handler, following the Next.js 16 docs § "Using dynamic imports".

Boundaries: `lib/content/` has no UI imports. `components/` has no `content/` imports — pages compose them.

### 5.4 No frontmatter parsing

`@next/mdx` does not support YAML frontmatter by default and the docs recommend `export const meta`. The spec uses the export approach to avoid adding `remark-frontmatter` + `remark-mdx-frontmatter` or `gray-matter`. If `/writing` is added later and needs YAML for tooling reasons (e.g. RSS generation from a fs walk), that decision is reopened.

## 6. Visual system

### 6.1 Typography

- **Sans (UI)**: Geist Sans (already loaded via `next/font/google`).
- **Mono (labels, code, stack chips)**: Geist Mono (already loaded).
- **Weights used**: 400 (body), 500 (UI labels), 600 (headings). No 700.
- **Sizes**: small modular scale. Base 16px, headings 18 / 20 / 24 / 32 only. No display sizes above 32.
- **Line-height**: 1.5 body, 1.2 headings.
- **Tracking**: default; no letterspacing tweaks.

### 6.2 Colour

- Light + dark via `prefers-color-scheme` only (no toggle in v1).
- Palette: Tailwind's `neutral` (or `zinc`) scale exclusively. Background `neutral-50` / `neutral-950`; text `neutral-900` / `neutral-100`; muted `neutral-500`.
- Single accent reserved for links and focus rings only. Default to `blue-600` (light) / `blue-400` (dark); the implementation can drop the accent entirely (use underline instead) if it reads too "themed" — that decision lives in implementation, not spec.
- The `globals.css` rule `font-family: Arial, Helvetica, sans-serif` contradicts the Geist setup and must be removed.

### 6.3 Layout

- Single column. Max content width ~720px; experimental wider (~960px) for the projects index only.
- Generous vertical rhythm (Tailwind `space-y-12` between sections on `/`).
- Horizontal padding scales with viewport (`px-6 md:px-8`).
- No decorative chrome (no borders, no shadowed cards, no gradients).
- Project cards are bare: title row, summary, stack chips, links — separated by `hr` or `border-t` only.

### 6.4 Motion and interaction

- No motion in v1. No fade-ins, no scroll-triggered animations.
- Hover states limited to underline reveal on links.
- `prefers-reduced-motion` respected by default (trivially, since there is no motion).

### 6.5 Density

High by design — engineer audience scans. The home page should fit hero + profile + 2 featured projects above the fold on a 13-inch laptop in dark mode.

## 7. Components

Small focused units; no business logic; no data fetching.

| Component | Purpose | Props (sketch) | Depends on |
|---|---|---|---|
| `Hero` | Name, role label, location, stack line | `{ name, roleLabel, location, stackLine }` | none |
| `ProfileStatement` | One verbatim paragraph | `{ children }` | none |
| `ProjectCard` | Card for `/` featured + `/projects` index | `{ project: ProjectMeta }` | `Link` |
| `ExperienceList` | Ordered list of experience entries | `{ entries: ExperienceEntry[], careerBreaks?: ... }` | none |
| `ExperienceItem` | One role | `{ entry: ExperienceEntry }` | none |
| `ContactList` | Email / LinkedIn / GitHub / CV links | `{ links: Link[] }` | none |
| `ProseLayout` | Wrapper for MDX content with typographic styles | `{ children }` | none |
| `Footer` | Tiny — © + LinkedIn + GitHub + last-updated | `{ }` | none |

`mdx-components.tsx` (required by `@next/mdx`) maps h1/h2/h3/p/ul/li/code/pre to the same typographic primitives used elsewhere — single styling pathway, no MDX-specific CSS.

## 8. Metadata and SEO

- `app/layout.tsx` exports a `metadata` object with site-wide defaults (title template `"%s · Francesco Barbano"`, description, OG defaults, robots index).
- Each route exports its own `metadata` or `generateMetadata`:
  - `/`: title "Francesco Barbano — Senior Full-Stack Engineer".
  - `/projects`: title "Projects".
  - `/projects/[slug]`: title from `meta.title`; description from `meta.summary`.
  - `/cv`: title "CV".
- One static OG image at `public/og-default.png` (1200×630). Per-page generated OG is out of scope for v1.
- `app/sitemap.ts` and `app/robots.ts` (file conventions) — both static, listing all routes.
- `lang="en"` on `<html>` (already set).

## 9. Performance and a11y budgets

- All routes statically rendered. No client components unless required. Target: zero JS on `/` aside from React hydration noise.
- Lighthouse target on `/`: 100 / 100 / 100 / 100 in CI-equivalent run on a mid-tier laptop.
- LCP < 1s on cable; CLS ~0; TBT 0.
- Semantic landmarks (`<main>`, `<nav>` where relevant, `<footer>`).
- Focus rings preserved (no `outline: none`); keyboard navigation full.
- Colour contrast meets WCAG AA in both themes.

## 10. File and module structure

```
app/
  layout.tsx               # root layout, font + metadata defaults
  page.tsx                 # /
  not-found.tsx
  projects/
    page.tsx               # /projects
    [slug]/
      page.tsx             # /projects/[slug]
  cv/
    page.tsx               # /cv
  sitemap.ts
  robots.ts
mdx-components.tsx         # required for @next/mdx in App Router
components/
  hero.tsx
  profile-statement.tsx
  project-card.tsx
  experience-list.tsx
  experience-item.tsx
  contact-list.tsx
  prose-layout.tsx
  footer.tsx
content/
  profile.ts
  projects/
    index.ts               # manifest
    portfolio.mdx
    cv-renderer.mdx
lib/
  content/
    projects.ts            # listProjects / getProjectMeta
public/
  og-default.png
  cv-eu.pdf                # copied from cv repo build
```

`app/globals.css` is kept; the rogue Arial body font rule is removed.

The existing scaffold files (`app/page.tsx`, `app/layout.tsx`) are rewritten:

- `app/page.tsx` becomes the composed `/` route from § 4.1.
- `app/layout.tsx` keeps its Geist font setup, replaces the `Create Next App` metadata with the site defaults from § 8, and drops anything that contradicts the visual system in § 6.

## 11. Dependencies to add

- `@next/mdx`
- `@mdx-js/loader`
- `@mdx-js/react`
- `@types/mdx`

Nothing else. No icon library (use inline SVG or text), no animation library, no UI kit, no analytics.

## 12. Out of scope (explicit)

- Blog / `/writing` route. Architecture supports adding it as a future single-evening change; not included in v1.
- RSS / Atom feeds.
- View counters, comments, reactions.
- Generated per-project OG images (one static OG for v1).
- Dark-mode toggle. System pref only.
- i18n. English only.
- CMS / headless / DB.
- Analytics or telemetry.
- Automating the `cv-eu.pdf` copy from the `cv` repo build.

## 13. Risks and mitigations

- **Content shipped half-formed kills the conversion**. Mitigation: spec defines v1 as the honest current-state (2 projects). Empty sections are removed, not stubbed.
- **MDX + standalone build interaction**. Mitigation: the production Dockerfile is multi-stage with `next.config.ts → output: 'standalone'`; the build must be exercised locally and in CI before merging.
- **NDA leak through a project page**. Mitigation: spec excludes any Travelware-derived project from `content/projects/`. Travelware lives in experience only, using CV-verbatim bullets.
- **Drift between CV repo and `content/profile.ts`**. Mitigation: documented as manual; the `cv` repo is canonical when in conflict.
- **`/writing` deferral being permanent**. Acceptable — writing is the highest Pool-B signal but content-cost is real. Adding `/writing` later costs ~1 evening given the architecture here.

## 14. Acceptance checklist (post-implementation)

- `pnpm dev` serves `/`, `/projects`, `/projects/portfolio`, `/projects/cv-renderer`, `/cv`, `/404`.
- `pnpm build` produces a standalone output that runs in the existing Docker image.
- Lighthouse on `/` is 100 / 100 / 100 / 100 locally.
- The hero, profile statement, and experience bullets match the CV (`wiki/sources/cv-eu.md`) verbatim.
- Project page MDX renders with typographic styles from `prose-layout`.
- `og-default.png` exists; `metadata.openGraph` references it.
- Existing CI workflow builds and pushes `:latest` + `:sha-<short>` without modification.
- No client-only components on `/` (verified via build output).
- No imports of Travelware-internal content in any project MDX.
