/**
 * ProjectsGrid — Client Component
 *
 * Handles category filter state. Kept as a Client Component so the
 * parent ProjectsPage (Server Component) can fetch data without re-fetching
 * on filter changes.
 *
 * Architectural pattern: "Islands of interactivity" — Server Component passes
 * all data down; only the filter logic lives on the client.
 */

"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/features/ProjectCard";
import type { Project, ProjectCategory } from "@/domain/types";

interface ProjectsGridProps {
  projects: ReadonlyArray<Project>;
}

type FilterValue = ProjectCategory | "all";

const FILTERS: Array<{ value: FilterValue; label: string }> = [
  { value: "all",       label: "Todos" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "frontend",  label: "Frontend" },
  { value: "backend",   label: "Backend" },
  { value: "tool",      label: "Herramientas" },
  { value: "oss",       label: "Open Source" },
];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [projects, activeFilter]
  );

  return (
    <Section spacing="lg">
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filtrar proyectos por categoría"
        className="flex flex-wrap gap-2 mb-10"
      >
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={activeFilter === value}
            onClick={() => setActiveFilter(value)}
            className={[
              "px-4 py-2 rounded-pill text-label-md transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              activeFilter === value
                ? "bg-accent text-content-inverse shadow-sm"
                : "bg-surface-secondary text-content-secondary hover:text-content hover:bg-surface-tertiary border border-border",
            ].join(" ")}
          >
            {label}
            {activeFilter === value && value !== "all" && (
              <span className="ml-2 text-label-sm opacity-75">
                ({filtered.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Result count (screen reader) */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Mostrando {filtered.length} proyecto{filtered.length !== 1 ? "s" : ""}
        {activeFilter !== "all" ? ` en ${activeFilter}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-section-sm">
          <p className="text-body-lg text-content-secondary">
            No hay proyectos en esta categoría todavía.
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Lista de proyectos"
        >
          {filtered.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
