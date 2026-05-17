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
