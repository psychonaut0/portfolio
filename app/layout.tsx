import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://portfolio.ncsp.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Francesco Barbano — Senior Full-Stack Engineer",
    template: "%s · Francesco Barbano",
  },
  description:
    "Senior full-stack engineer building distributed travel-tech systems and AI-augmented developer workflows. Italy, open to EU remote.",
  openGraph: {
    title: "Francesco Barbano — Senior Full-Stack Engineer",
    description:
      "Senior full-stack engineer building distributed travel-tech systems and AI-augmented developer workflows.",
    url: SITE_URL,
    siteName: "Francesco Barbano",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    locale: "en",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
