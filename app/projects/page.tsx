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
