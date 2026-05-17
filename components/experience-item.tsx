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
