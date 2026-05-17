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
