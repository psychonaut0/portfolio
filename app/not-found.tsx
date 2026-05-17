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
