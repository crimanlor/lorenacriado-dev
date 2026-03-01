/**
 * Static Data — Profile
 *
 * Simulates a CMS response. The shape mirrors what a Notion page property
 * object or a Contentful entry would return after normalization.
 *
 * To migrate to a real CMS:
 *  1. Create /lib/data/notion/profile.ts (or /contentful/profile.ts)
 *  2. Fetch + normalize the remote data into the same `Profile` type
 *  3. Swap the import in /lib/data/index.ts — zero changes elsewhere
 */

import type { Profile } from "@/domain/types";
import { asUrl } from "@/domain/types";

export const profileData: Profile = {
  name: "Lorena Criado Manzaneque",
  title: "Full-Stack Engineer",
  tagline:
    "I build scalable web applications with clean architecture, great UX, and production-grade reliability.",
  bio: `I'm a full-stack engineer passionate about the intersection of clean code, 
developer experience, and user-centric design. I work across the entire stack — 
from crafting accessible React interfaces to designing resilient Node.js APIs and 
cloud-native infrastructure. I care deeply about code quality, team collaboration, 
and shipping software that makes a real difference.`,
  location: "Spain",
  avatarUrl: asUrl("https://avatars.githubusercontent.com/u/0"),
  resumeUrl: asUrl("/resume.pdf"),
  social: [
    {
      platform: "github",
      url: asUrl("https://github.com/lorena-criado"),
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: asUrl("https://linkedin.com/in/lorena-criado"),
      label: "LinkedIn",
    },
    {
      platform: "email",
      url: asUrl("mailto:hello@lorenacriado.dev"),
      label: "Email",
    },
  ],
};
