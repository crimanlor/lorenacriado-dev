/**
 * SkillsSection — Technology skills grid
 *
 * Groups skills by category, renders a skill level indicator bar.
 * Server Component — no interactivity needed.
 */

import { Section, SectionHeader } from "@/components/ui/Section";
import { getSkillGroups } from "@/lib/data";
import type { SkillLevel } from "@/domain/types";

const levelConfig: Record<SkillLevel, { label: string; width: string; color: string }> = {
  learning:   { label: "Learning",   width: "w-1/3",  color: "bg-yellow-400" },
  proficient: { label: "Proficient", width: "w-2/3",  color: "bg-blue-500" },
  expert:     { label: "Expert",     width: "w-full", color: "bg-accent" },
};

export async function SkillsSection() {
  const groups = await getSkillGroups();

  return (
    <Section id="skills" spacing="lg">
      <SectionHeader
        eyebrow="Expertise"
        heading="Skills & Technologies"
        subheading="Technologies I work with daily, categorized by domain."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {groups.map((group) => (
          <div
            key={group.category}
            className="bg-surface-secondary rounded-card p-6 border border-border"
          >
            <h3 className="text-label-lg text-content-secondary uppercase tracking-widest mb-5">
              {group.label}
            </h3>
            <ul className="space-y-4" role="list">
              {group.skills.map((skill) => {
                const level = levelConfig[skill.level];
                return (
                  <li key={skill.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-body-sm text-content font-medium">
                        {skill.name}
                      </span>
                      <span className="text-label-sm text-content-tertiary">
                        {skill.yearsOfExperience}y · {level.label}
                      </span>
                    </div>
                    {/* Accessible progress bar */}
                    <div
                      className="h-1.5 bg-surface-tertiary rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={
                        skill.level === "expert" ? 100 :
                        skill.level === "proficient" ? 66 : 33
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name}: ${level.label}`}
                    >
                      <div
                        className={[
                          "h-full rounded-full transition-all duration-1000",
                          level.width,
                          level.color,
                        ].join(" ")}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
