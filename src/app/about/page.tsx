/**
 * About Page — /about
 *
 * SEO: exports metadata with page-specific title and description.
 * Renders the full About + Experience + Education sections.
 */

import type { Metadata } from "next";
import type React from "react";
import { AboutSection } from "@/components/features/AboutSection";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getProfile, getEducation } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce a Lorena Criado Manzaneque — su trayectoria, valores, experiencia laboral y formación académica como Full-Stack Engineer.",
};

// Cast for async Server Component type compat
const AboutSectionComponent = AboutSection as unknown as React.ComponentType;

export default async function AboutPage() {
  const [profile, education] = await Promise.all([
    getProfile(),
    getEducation(),
  ]);

  return (
    <>
      {/* Page hero */}
      <section
        className="pt-32 pb-section-sm bg-surface border-b border-border"
        aria-labelledby="about-page-heading"
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-label-md text-accent uppercase tracking-widest mb-3">
            Sobre mí
          </p>
          <h1
            id="about-page-heading"
            className="text-display-lg text-content mb-4"
          >
            {profile.name}
          </h1>
          <p className="text-body-xl text-content-secondary max-w-prose-lg">
            {profile.tagline}
          </p>
        </div>
      </section>

      {/* About + Experience (shared section component) */}
      <AboutSectionComponent />

      {/* Education */}
      <Section id="education" bg="secondary" spacing="md">
        <SectionHeader eyebrow="Formación" heading="Trayectoria académica" />
        <ul className="space-y-6" role="list">
          {education.map((edu) => (
            <li
              key={edu.id}
              className="flex gap-4 p-6 bg-surface rounded-card border border-border"
            >
              <div className="shrink-0 p-3 bg-accent-subtle rounded-md">
                <GraduationCap
                  size={20}
                  className="text-accent"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-body-lg text-content font-semibold">
                  {edu.degree} — {edu.field}
                </h3>
                <p className="text-body-sm text-accent mb-1">{edu.institution}</p>
                <p className="text-label-sm text-content-tertiary">
                  <time dateTime={edu.startDate}>{formatDate(edu.startDate)}</time>
                  {edu.endDate && (
                    <>
                      {" — "}
                      <time dateTime={edu.endDate}>{formatDate(edu.endDate)}</time>
                    </>
                  )}
                </p>
                {edu.description && (
                  <p className="text-body-sm text-content-secondary mt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
