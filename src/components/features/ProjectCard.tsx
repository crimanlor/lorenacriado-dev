/**
 * ProjectCard — Project display card
 *
 * Handles image loading state, status badge, tech tags, and action links.
 * Performance: images are lazy-loaded (default Next/Image behavior).
 */

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/domain/types";

interface ProjectCardProps {
  project: Project;
}

const statusConfig = {
  live:     { label: "Live",     variant: "success"  as const },
  wip:      { label: "In Progress", variant: "warning" as const },
  archived: { label: "Archived", variant: "default"  as const },
};

// Maps tag color names to Tailwind background + text classes
const tagColorMap: Record<string, string> = {
  slate:  "bg-slate-100  text-slate-700  dark:bg-slate-800  dark:text-slate-300",
  blue:   "bg-blue-100   text-blue-700   dark:bg-blue-900/40  dark:text-blue-300",
  green:  "bg-green-100  text-green-700  dark:bg-green-900/40 dark:text-green-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  cyan:   "bg-cyan-100   text-cyan-700   dark:bg-cyan-900/40  dark:text-cyan-300",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  pink:   "bg-pink-100   text-pink-700   dark:bg-pink-900/40  dark:text-pink-300",
  sky:    "bg-sky-100    text-sky-700    dark:bg-sky-900/40   dark:text-sky-300",
  red:    "bg-red-100    text-red-700    dark:bg-red-900/40   dark:text-red-300",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <Card hoverable className="flex flex-col h-full group">
      {/* Project image */}
      <div className="relative h-48 rounded-t-card overflow-hidden bg-surface-secondary">
        <Image
          src={project.imageUrl}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          // Lazy loading is the default; only the hero avatar uses priority
        />
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </div>

      <Card.Body className="flex flex-col flex-1 gap-4">
        {/* Title + description */}
        <div>
          <Link
            href={`/projects/${project.slug}`}
            className="group/title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <h3 className="text-display-sm text-content group-hover/title:text-accent transition-colors duration-200">
              {project.title}
            </h3>
          </Link>
          <p className="text-body-sm text-content-secondary mt-2 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={[
                "inline-flex items-center px-2.5 py-0.5 rounded-pill text-label-sm font-medium",
                tagColorMap[tag.color] ?? tagColorMap["slate"],
              ].join(" ")}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </Card.Body>

      {/* Action links */}
      <Card.Footer>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className={[
              "flex items-center gap-1.5 text-label-sm text-content-secondary",
              "hover:text-content transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
            ].join(" ")}
          >
            <Github size={15} aria-hidden="true" />
            Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} live site`}
            className={[
              "flex items-center gap-1.5 text-label-sm text-accent",
              "hover:text-accent-hover transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
            ].join(" ")}
          >
            <ExternalLink size={15} aria-hidden="true" />
            Live Demo
          </a>
        )}
      </Card.Footer>
    </Card>
  );
}
