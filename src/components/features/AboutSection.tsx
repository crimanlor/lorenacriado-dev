/**
 * AboutSection — Bio + experience timeline
 *
 * Renders the profile bio and work experience as a vertical timeline.
 * Fully server-rendered for optimal SEO and performance.
 */

import { Section, SectionHeader } from "@/components/ui/Section";
import { getProfile, getExperiences } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Building2, Calendar } from "lucide-react";

export async function AboutSection() {
  const [profile, experiences] = await Promise.all([
    getProfile(),
    getExperiences(),
  ]);

  return (
    <Section id="about" spacing="lg">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Bio */}
        <div>
          <SectionHeader eyebrow="Sobre mí" heading="Quién soy" />
          <div className="space-y-4">
            {profile.bio.split("\n").filter(Boolean).map((paragraph, i) => (
              <p key={i} className="text-body-lg text-content-secondary leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>

        {/* Experience timeline */}
        <div>
          <SectionHeader eyebrow="Experiencia" heading="Trayectoria" />
          <ol className="relative border-l border-border space-y-10 ml-4" role="list">
            {experiences.map((exp, index) => (
              <li key={exp.id} className="ml-6">
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4",
                    index === 0
                      ? "bg-accent ring-surface"
                      : "bg-surface-secondary ring-surface border border-border",
                  ].join(" ")}
                />

                {/* Dates */}
                <div className="flex items-center gap-2 text-label-sm text-content-tertiary mb-1">
                  <Calendar size={12} aria-hidden="true" />
                  <time dateTime={exp.startDate}>
                    {formatDate(exp.startDate)}
                  </time>
                  <span>—</span>
                  {exp.endDate ? (
                    <time dateTime={exp.endDate}>{formatDate(exp.endDate)}</time>
                  ) : (
                    <span className="text-accent font-medium">Actualidad</span>
                  )}
                </div>

                {/* Role + company */}
                <h3 className="text-body-lg text-content font-semibold">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-1.5 text-body-sm text-accent mb-3">
                  <Building2 size={13} aria-hidden="true" />
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </div>

                {/* Description */}
                <p className="text-body-sm text-content-secondary mb-3">
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5" role="list" aria-label="Aspectos destacados">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-body-sm text-content-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
