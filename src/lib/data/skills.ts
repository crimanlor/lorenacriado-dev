/**
 * Static Data — Skills
 *
 * Skills are grouped by category for display in the Skills section.
 * Level scale: learning → proficient → expert
 */

import type { SkillGroup } from "@/domain/types";

export const skillGroupsData: ReadonlyArray<SkillGroup> = [
  {
    category: "language",
    label: "Languages",
    skills: [
      { id: "ts",     name: "TypeScript",  category: "language",    level: "expert",     yearsOfExperience: 5 },
      { id: "js",     name: "JavaScript",  category: "language",    level: "expert",     yearsOfExperience: 7 },
      { id: "python", name: "Python",      category: "language",    level: "proficient", yearsOfExperience: 4 },
      { id: "sql",    name: "SQL",         category: "language",    level: "expert",     yearsOfExperience: 6 },
    ],
  },
  {
    category: "framework",
    label: "Frameworks & Libraries",
    skills: [
      { id: "react",    name: "React",       category: "framework", level: "expert",     yearsOfExperience: 5 },
      { id: "nextjs",   name: "Next.js",     category: "framework", level: "expert",     yearsOfExperience: 4 },
      { id: "nodejs",   name: "Node.js",     category: "framework", level: "expert",     yearsOfExperience: 6 },
      { id: "express",  name: "Express",     category: "framework", level: "expert",     yearsOfExperience: 5 },
      { id: "graphql",  name: "GraphQL",     category: "framework", level: "proficient", yearsOfExperience: 3 },
      { id: "tailwind", name: "Tailwind CSS",category: "framework", level: "expert",     yearsOfExperience: 3 },
    ],
  },
  {
    category: "database",
    label: "Databases",
    skills: [
      { id: "postgres", name: "PostgreSQL", category: "database", level: "expert",     yearsOfExperience: 5 },
      { id: "mongo",    name: "MongoDB",    category: "database", level: "proficient", yearsOfExperience: 4 },
      { id: "redis",    name: "Redis",      category: "database", level: "proficient", yearsOfExperience: 3 },
    ],
  },
  {
    category: "cloud",
    label: "Cloud & Infrastructure",
    skills: [
      { id: "aws",     name: "AWS",        category: "cloud",   level: "proficient", yearsOfExperience: 4 },
      { id: "docker",  name: "Docker",     category: "cloud",   level: "expert",     yearsOfExperience: 4 },
      { id: "vercel",  name: "Vercel",     category: "cloud",   level: "expert",     yearsOfExperience: 3 },
      { id: "github",  name: "GitHub CI/CD",category: "cloud",  level: "expert",     yearsOfExperience: 5 },
    ],
  },
  {
    category: "methodology",
    label: "Methodologies",
    skills: [
      { id: "agile",    name: "Agile / Scrum",       category: "methodology", level: "expert",     yearsOfExperience: 5 },
      { id: "tdd",      name: "TDD",                  category: "methodology", level: "proficient", yearsOfExperience: 4 },
      { id: "ddd",      name: "Domain-Driven Design", category: "methodology", level: "proficient", yearsOfExperience: 3 },
      { id: "a11y",     name: "Web Accessibility",    category: "methodology", level: "proficient", yearsOfExperience: 3 },
    ],
  },
];
