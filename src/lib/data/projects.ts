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
    title: "Enterprise SaaS Platform",
    description:
      "Multi-tenant SaaS platform with real-time collaboration, role-based access control, and usage analytics dashboard.",
    longDescription:
      "Built a full-stack multi-tenant SaaS platform serving 200+ enterprise clients. Architected a microservices backend with Node.js and PostgreSQL, a React frontend with real-time updates via WebSockets, and a CI/CD pipeline on AWS. Implemented RBAC, SSO via OAuth2, and a comprehensive analytics dashboard.",
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
    title: "Developer CLI Toolkit",
    description:
      "Open-source CLI tool that automates project scaffolding, code generation, and team workflow standardization.",
    longDescription:
      "A Node.js CLI distributed via npm that helps teams scaffold projects with opinionated templates, enforce coding standards, and automate repetitive tasks. Used by 500+ developers.",
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
    title: "Component Design System",
    description:
      "Accessible, themeable React component library with Storybook documentation and automated visual regression tests.",
    longDescription:
      "Designed and built a production-grade component library following WCAG 2.1 AA standards. Features 60+ components, automated accessibility testing with axe-core, and a token-based theming system.",
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
    title: "Real-time Collaboration API",
    description:
      "GraphQL API with WebSocket subscriptions powering real-time document collaboration for up to 1,000 concurrent users.",
    longDescription:
      "Architected and deployed a GraphQL API with real-time capabilities using Apollo Server and Redis Pub/Sub. Handles concurrent editing with Operational Transformation and CRDT algorithms.",
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
    title: "Personal Portfolio v2",
    description:
      "This very portfolio — built with Next.js 14, enterprise-style Clean Architecture, and full accessibility compliance.",
    longDescription:
      "A production-grade personal portfolio built with Next.js 14 App Router, Clean Architecture, design tokens, WCAG 2.1 AA accessibility, and comprehensive performance optimization.",
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
