/**
 * Static Data — Experience & Education
 */

import type { Experience, Education } from "@/domain/types";
import { asUrl, asISODate } from "@/domain/types";

export const experienceData: ReadonlyArray<Experience> = [
  {
    id: "exp-001",
    company: "TechCorp Global",
    role: "Senior Full-Stack Engineer",
    startDate: asISODate("2022-03-01"),
    description:
      "Led architecture and development of a multi-tenant SaaS platform serving 200+ enterprise clients across Europe.",
    highlights: [
      "Reduced API response times by 60% through query optimization and caching strategies",
      "Migrated monolith to microservices, improving deployment frequency from monthly to daily",
      "Mentored a team of 4 junior engineers and established code review standards",
      "Shipped an accessible component library adopted by 3 internal product teams",
    ],
    technologies: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker"],
    companyUrl: asUrl("https://techcorp.example.com"),
  },
  {
    id: "exp-002",
    company: "StartupXYZ",
    role: "Full-Stack Engineer",
    startDate: asISODate("2020-06-01"),
    endDate: asISODate("2022-02-28"),
    description:
      "Joined as employee #8 and helped grow the engineering team and product from MVP to Series A.",
    highlights: [
      "Built the core real-time collaboration feature that became the product's key differentiator",
      "Implemented end-to-end testing pipeline reducing bug escape rate by 40%",
      "Integrated third-party payment system processing €500K+ monthly",
    ],
    technologies: ["React", "Express", "MongoDB", "WebSocket", "Stripe", "Heroku"],
    companyUrl: asUrl("https://startupxyz.example.com"),
  },
  {
    id: "exp-003",
    company: "DigitalAgency",
    role: "Frontend Developer",
    startDate: asISODate("2018-09-01"),
    endDate: asISODate("2020-05-31"),
    description:
      "Developed responsive, accessible web applications for clients across finance, healthcare, and e-commerce sectors.",
    highlights: [
      "Delivered 15+ client projects on schedule with an average satisfaction score of 4.8/5",
      "Championed accessibility standards adoption — all projects shipped WCAG 2.1 AA compliant",
      "Introduced automated performance budgets reducing average page load by 35%",
    ],
    technologies: ["React", "TypeScript", "Sass", "Jest", "Webpack"],
    companyUrl: asUrl("https://digitalagency.example.com"),
  },
];

export const educationData: ReadonlyArray<Education> = [
  {
    id: "edu-001",
    institution: "Universidad Complutense de Madrid",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    startDate: asISODate("2014-09-01"),
    endDate: asISODate("2018-06-30"),
    description:
      "Specialized in software engineering, algorithms, and distributed systems. Final project: distributed key-value store with consensus protocol.",
  },
  {
    id: "edu-002",
    institution: "Online — Coursera / AWS Training",
    degree: "Professional Certifications",
    field: "Cloud Architecture & Solutions",
    startDate: asISODate("2021-01-01"),
    endDate: asISODate("2021-12-31"),
    description:
      "AWS Certified Developer – Associate. Meta Front-End Developer Professional Certificate.",
  },
];
