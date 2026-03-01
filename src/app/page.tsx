/**
 * Homepage — /
 *
 * Composed of async Server Components using React Suspense for streaming.
 * This is the recommended pattern for below-the-fold sections in Next.js 14:
 * - HeroSection renders eagerly (above fold, LCP critical)
 * - Lower sections are wrapped in Suspense → streamed as they resolve
 *
 * Code-splitting is achieved automatically by Next.js at the page boundary.
 * next/dynamic is only needed for Client Components with heavy libraries.
 */

import { Suspense } from "react";
import { HeroSection } from "@/components/features/HeroSection";
import { FeaturedProjects } from "@/components/features/FeaturedProjects";
import { SkillsSection } from "@/components/features/SkillsSection";
import { ContactSection } from "@/components/features/ContactSection";

/** Minimal height placeholder shown during streaming SSR */
function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <div
      className={`${height} bg-surface animate-pulse flex items-center justify-center`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="space-y-4 w-full max-w-content mx-auto px-4">
        <div className="h-8 bg-surface-secondary rounded w-48" />
        <div className="h-4 bg-surface-secondary rounded w-96" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-surface-secondary rounded-card" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Cast async Server Components for compatibility with older @types/react
// These work correctly at runtime — Next.js 14 supports async Server Components
const Hero        = HeroSection        as unknown as React.ComponentType;
const Projects    = FeaturedProjects   as unknown as React.ComponentType;
const Skills      = SkillsSection      as unknown as React.ComponentType;
const Contact     = ContactSection     as unknown as React.ComponentType;

import type React from "react";

export default function HomePage() {
  return (
    <>
      {/* Above the fold — no Suspense boundary, renders synchronously for best LCP */}
      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <Hero />
      </Suspense>

      {/* Below the fold — Suspense enables streaming HTML for faster TTFB */}
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <Contact />
      </Suspense>
    </>
  );
}
