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
