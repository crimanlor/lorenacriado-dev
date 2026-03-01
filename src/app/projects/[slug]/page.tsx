/**
 * Project Detail Page — /projects/[slug]
 *
 * Dynamic route with Static Site Generation (generateStaticParams).
 * All project pages are pre-rendered at build time — zero server latency.
 * generateMetadata provides per-project OG tags for social sharing.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowLeft, Calendar } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

// ─── Static Generation ───────────────────────────────────────────────────────
// Pre-render all project pages at build time
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// ─── Per-page SEO ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.imageUrl, alt: project.title }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  // Triggers the not-found boundary → renders /app/not-found.tsx
  if (!project) notFound();

  return (
    <article className="pt-24" aria-labelledby="project-title">
      {/* Back link */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/projects"
          className={[
            "inline-flex items-center gap-2 text-label-md text-content-secondary",
            "hover:text-content transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
          ].join(" ")}
          aria-label="Volver a todos los proyectos"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Todos los proyectos
        </Link>
      </div>

      {/* Hero image */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative h-64 md:h-96 rounded-card overflow-hidden bg-surface-secondary">
          <Image
            src={project.imageUrl}
            alt={`Captura de pantalla de ${project.title}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-section-lg">
        <div className="grid lg:grid-cols-[1fr_320px] gap-16">
          {/* Main content */}
          <div>
            <div className="flex items-start gap-4 mb-6 flex-wrap">
              <h1
                id="project-title"
                className="text-display-md text-content flex-1"
              >
                {project.title}
              </h1>
              <Badge
                variant={
                  project.status === "live"
                    ? "success"
                    : project.status === "wip"
                    ? "warning"
                    : "default"
                }
              >
                {project.status === "live"
                  ? "En producción"
                  : project.status === "wip"
                  ? "En progreso"
                  : "Archivado"}
              </Badge>
            </div>

            <p className="text-body-xl text-content-secondary mb-8">
              {project.description}
            </p>

            {project.longDescription && (
              <div className="prose-custom space-y-4">
                {project.longDescription.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="text-body-md text-content-secondary">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="space-y-6"
            aria-label="Detalles del proyecto"
          >
            {/* Actions */}
            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Visitar el sitio en producción de ${project.title}`}
                >
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<ExternalLink size={16} aria-hidden="true" />}
                    className="w-full justify-center"
                  >
                    Ver demo en producción
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Ver el código fuente de ${project.title} en GitHub`}
                >
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Github size={16} aria-hidden="true" />}
                    className="w-full justify-center"
                  >
                    Código fuente
                  </Button>
                </a>
              )}
            </div>

            {/* Meta */}
            <div className="p-5 bg-surface-secondary rounded-card border border-border space-y-4">
              <div>
                <p className="text-label-sm text-content-tertiary uppercase tracking-wider mb-1">
                  Publicado
                </p>
                <div className="flex items-center gap-1.5 text-body-sm text-content">
                  <Calendar size={13} aria-hidden="true" />
                  <time dateTime={project.publishedAt}>
                    {formatDate(project.publishedAt, { year: "numeric", month: "long" })}
                  </time>
                </div>
              </div>

              <div>
                <p className="text-label-sm text-content-tertiary uppercase tracking-wider mb-2">
                  Tecnologías
                </p>
                <div className="flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-label-sm bg-surface border border-border text-content-secondary"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
