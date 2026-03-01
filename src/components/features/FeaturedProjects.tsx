/**
 * FeaturedProjects — Homepage projects grid
 *
 * Lazy-loads the full project list page; shows only featured projects here.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";
import { getFeaturedProjects } from "@/lib/data";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <Section id="projects" bg="secondary" spacing="lg">
      <SectionHeader
        eyebrow="Work"
        heading="Featured Projects"
        subheading="A selection of projects I'm proud of — from enterprise platforms to open-source tools."
        align="center"
      />

      {/* Projects grid */}
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Featured projects"
      >
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {/* CTA to full projects page */}
      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className={[
            "inline-flex items-center gap-2 text-label-md text-accent",
            "hover:gap-3 transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
          ].join(" ")}
          aria-label="View all projects"
        >
          View all projects
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
