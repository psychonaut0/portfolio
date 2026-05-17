import type { Link as ProfileLink } from "@/content/profile";

type ContactListProps = {
  links: ProfileLink[];
};

export function ContactList({ links }: ContactListProps) {
  return (
    <ul className="font-mono text-sm space-y-1">
      {links.map((link) => (
        <li key={link.kind}>
          <span aria-hidden="true" className="text-muted">{link.kind}</span>
          <span aria-hidden="true" className="text-muted"> · </span>
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
