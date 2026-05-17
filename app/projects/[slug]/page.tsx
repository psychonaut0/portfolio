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
