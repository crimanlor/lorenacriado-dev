/**
 * Projects Page — /projects
 *
 * Shows all projects with category filter tabs (client component).
 * The project grid itself is server-rendered; only the filter state is client-side.
 */

import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data";
import { ProjectsGrid } from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora el portfolio de proyectos full-stack de Lorena Criado — desde plataformas SaaS empresariales hasta herramientas open-source.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      {/* Page hero */}
      <section
        className="pt-32 pb-section-sm bg-surface border-b border-border"
        aria-labelledby="projects-page-heading"
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-label-md text-accent uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1
            id="projects-page-heading"
            className="text-display-lg text-content mb-4"
          >
            Proyectos
          </h1>
          <p className="text-body-xl text-content-secondary max-w-prose-lg">
            Una selección de proyectos que he desarrollado — desde software empresarial en producción hasta experimentos personales y contribuciones open-source.
          </p>
        </div>
      </section>

      {/* Projects grid with client-side filters */}
      <ProjectsGrid projects={projects} />
    </>
  );
}
