/**
 * Root Layout — app/layout.tsx
 *
 * Architectural decisions:
 * - Fonts loaded via next/font (zero FOUT, self-hosted, subset)
 * - Header and Footer are Server Components (async, fetch data)
 * - ThemeProvider pattern: dark mode class set server-side to prevent flash
 * - Default metadata defined here; pages override specific fields
 * - Viewport and themeColor exported separately per Next.js 14 spec
 */

import type { Metadata, Viewport } from "next";
import type React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Type-cast helpers for async Server Components (Next.js 14 + @types/react 18 compat)
const HeaderComponent = Header as unknown as React.ComponentType;
const FooterComponent = Footer as unknown as React.ComponentType;

// ─── Fonts ───────────────────────────────────────────────────────────────────
// next/font automatically downloads, self-hosts, and subsets — no layout shift.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",          // FOUT over FOIT
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
// Defined once here; individual pages override title, description, openGraph
// using the metadata export from their own file.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://lorenacriado.dev"
  ),
  title: {
    default: "Lorena Criado Manzaneque — Full-Stack Engineer",
    template: "%s | Lorena Criado",
  },
  description:
    "Full-Stack Engineer especializada en aplicaciones web escalables, arquitectura limpia y experiencia de desarrollo. Basada en España.",
  keywords: [
    "Full-Stack Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "Software Engineer",
    "España",
    "Lorena Criado",
  ],
  authors: [{ name: "Lorena Criado Manzaneque", url: "https://lorenacriado.dev" }],
  creator: "Lorena Criado Manzaneque",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://lorenacriado.dev",
    siteName: "Lorena Criado Manzaneque",
    title: "Lorena Criado Manzaneque — Full-Stack Engineer",
    description:
      "Full-Stack Engineer especializada en aplicaciones web escalables, arquitectura limpia y experiencia de desarrollo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lorena Criado Manzaneque — Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorena Criado Manzaneque — Full-Stack Engineer",
    description:
      "Full-Stack Engineer especializada en aplicaciones web escalables y arquitectura limpia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning // Suppresses mismatch from theme class injected by inline script
    >
      <head>
        {/*
         * Inline script to set theme class before first paint.
         * Eliminates flash of wrong theme on hard reload / SSR.
         * Runs synchronously — intentionally tiny (~200B).
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                var d = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (d) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-content antialiased">
        <HeaderComponent />

        {/* id="main-content" is the target for the skip link in Header */}
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        <FooterComponent />
      </body>
    </html>
  );
}
