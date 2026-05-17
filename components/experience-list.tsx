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
