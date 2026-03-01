/**
 * Static Data — Projects
 *
 * Each project entry is structured to be CMS-ready.
 * The `slug` field maps to a dynamic route /projects/[slug].
 * `featured: true` items appear on the homepage.
 */

import type { Project } from "@/domain/types";
import { asUrl, asISODate } from "@/domain/types";

export const projectsData: ReadonlyArray<Project> = [
  {
    id: "p-001",
    slug: "enterprise-saas-platform",
    title: "Plataforma SaaS Enterprise",
    description:
      "Plataforma SaaS multi-tenant con colaboración en tiempo real, control de acceso por roles y panel de analíticas de uso.",
    longDescription:
      "Construí una plataforma SaaS multi-tenant full-stack para más de 200 clientes enterprise. Arquitecté un backend de microservicios con Node.js y PostgreSQL, un frontend React con actualizaciones en tiempo real via WebSockets y un pipeline CI/CD en AWS. Implementé RBAC, SSO via OAuth2 y un panel de analíticas completo.",
    imageUrl: asUrl("/images/projects/saas-platform.png"),
    tags: [
      { label: "Next.js", color: "slate" },
      { label: "Node.js", color: "green" },
      { label: "PostgreSQL", color: "blue" },
      { label: "AWS", color: "orange" },
      { label: "WebSocket", color: "purple" },
    ],
    category: "fullstack",
    status: "live",
    githubUrl: asUrl("https://github.com/lorena-criado/saas-platform"),
    liveUrl: asUrl("https://saas-platform.demo"),
    featured: true,
    publishedAt: asISODate("2024-09-01"),
  },
  {
    id: "p-002",
    slug: "developer-cli-toolkit",
    title: "Toolkit CLI para Desarrolladores",
    description:
      "Herramienta CLI open-source que automatiza el scaffolding de proyectos, la generación de código y la estandarización de flujos de trabajo en equipo.",
    longDescription:
      "Una CLI Node.js distribuida via npm que ayuda a los equipos a crear proyectos con plantillas predefinidas, aplicar estándares de código y automatizar tareas repetitivas. Utilizada por más de 500 desarrolladores.",
    imageUrl: asUrl("/images/projects/cli-toolkit.png"),
    tags: [
      { label: "Node.js", color: "green" },
      { label: "TypeScript", color: "blue" },
      { label: "Ink (React CLI)", color: "cyan" },
      { label: "Open Source", color: "yellow" },
    ],
    category: "tool",
    status: "live",
    githubUrl: asUrl("https://github.com/lorena-criado/dev-cli"),
    liveUrl: asUrl("https://npmjs.com/package/dev-cli"),
    featured: true,
    publishedAt: asISODate("2024-04-15"),
  },
  {
    id: "p-003",
    slug: "design-system",
    title: "Sistema de Diseño de Componentes",
    description:
      "Librería de componentes React accesible y con soporte de temas, con documentación en Storybook y tests de regresión visual automatizados.",
    longDescription:
      "Diseñé y construí una librería de componentes de nivel producción siguiendo los estándares WCAG 2.1 AA. Incluye más de 60 componentes, tests de accesibilidad automatizados con axe-core y un sistema de temas basado en tokens.",
    imageUrl: asUrl("/images/projects/design-system.png"),
    tags: [
      { label: "React", color: "sky" },
      { label: "TypeScript", color: "blue" },
      { label: "Storybook", color: "pink" },
      { label: "A11y", color: "green" },
    ],
    category: "frontend",
    status: "live",
    githubUrl: asUrl("https://github.com/lorena-criado/ui-system"),
    featured: true,
    publishedAt: asISODate("2023-11-20"),
  },
  {
    id: "p-004",
    slug: "realtime-api",
    title: "API de Colaboración en Tiempo Real",
    description:
      "API GraphQL con suscripciones WebSocket para colaboración en documentos en tiempo real para hasta 1.000 usuarios concurrentes.",
    longDescription:
      "Arquitecté y despleguéuna API GraphQL con capacidades en tiempo real usando Apollo Server y Redis Pub/Sub. Gestiona la edición concurrente con algoritmos de Transformación Operacional y CRDT.",
    imageUrl: asUrl("/images/projects/realtime-api.png"),
    tags: [
      { label: "GraphQL", color: "pink" },
      { label: "Node.js", color: "green" },
      { label: "Redis", color: "red" },
      { label: "Docker", color: "blue" },
    ],
    category: "backend",
    status: "archived",
    githubUrl: asUrl("https://github.com/lorena-criado/realtime-api"),
    featured: false,
    publishedAt: asISODate("2023-06-10"),
  },
  {
    id: "p-005",
    slug: "portfolio-v2",
    title: "Portfolio Personal v2",
    description:
      "Este mismo portfolio — construido con Next.js 14, arquitectura limpia de nivel enterprise y cumplimiento completo de accesibilidad.",
    longDescription:
      "Un portfolio personal de nivel producción construido con Next.js 14 App Router, arquitectura limpia, tokens de diseño, accesibilidad WCAG 2.1 AA y optimización de rendimiento completa.",
    imageUrl: asUrl("/images/projects/portfolio.png"),
    tags: [
      { label: "Next.js 14", color: "slate" },
      { label: "TypeScript", color: "blue" },
      { label: "Tailwind", color: "cyan" },
      { label: "A11y", color: "green" },
    ],
    category: "frontend",
    status: "live",
    githubUrl: asUrl("https://github.com/lorena-criado/portfolio"),
    liveUrl: asUrl("https://lorenacriado.dev"),
    featured: false,
    publishedAt: asISODate("2025-03-01"),
  },
];
