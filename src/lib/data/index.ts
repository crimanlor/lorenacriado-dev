/**
 * Data Repository — Static Implementation
 *
 * This is the concrete implementation of IPortfolioRepository using
 * static in-memory data. It satisfies the interface contract defined
 * in /domain/interfaces/repositories.ts.
 *
 * The async wrappers (Promise.resolve) intentionally simulate the latency
 * profile of a real async CMS call, making the future migration transparent
 * to consumers — they already await these functions.
 *
 * Performance note: In a real CMS scenario, Next.js fetch caching would be
 * applied here via `fetch(url, { next: { revalidate: 3600 } })`.
 */

import type { IPortfolioRepository } from "@/domain/interfaces/repositories";
import type { Project, NavItem, ContactInfo, VolunteerExperience } from "@/domain/types";

import { profileData }     from "./profile";
import { projectsData }    from "./projects";
import { skillGroupsData } from "./skills";
import { experienceData, educationData, volunteerData } from "./experience";

// Navigation items — defined here as they are layout-level config
const navItems: ReadonlyArray<NavItem> = [
  { label: "Sobre mí",  href: "/about" },
  { label: "Proyectos", href: "/projects" },
  { label: "Skills",    href: "/#skills" },
  { label: "Contacto",  href: "/contact" },
];

const contactInfo: ContactInfo = {
  email: "hello@lorenacriado.dev",
  availability: "available",
  preferredContact: "email",
};

/**
 * StaticPortfolioRepository
 *
 * Single Responsibility: serves portfolio data from static sources.
 * Open/Closed: extend by creating a new repository class; no modification needed.
 */
class StaticPortfolioRepository implements IPortfolioRepository {
  async getProfile()        { return Promise.resolve(profileData); }
  async getAllProjects()     { return Promise.resolve(projectsData); }
  async getSkillGroups()    { return Promise.resolve(skillGroupsData); }
  async getExperiences()         { return Promise.resolve(experienceData); }
  async getEducation()           { return Promise.resolve(educationData); }
  async getVolunteerExperiences(): Promise<ReadonlyArray<VolunteerExperience>> {
    return Promise.resolve(volunteerData);
  }
  async getNavItems()       { return Promise.resolve(navItems); }
  async getContactInfo()    { return Promise.resolve(contactInfo); }

  async getFeaturedProjects(): Promise<ReadonlyArray<Project>> {
    return Promise.resolve(projectsData.filter((p) => p.featured));
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return Promise.resolve(projectsData.find((p) => p.slug === slug) ?? null);
  }
}

/**
 * Singleton repository instance.
 *
 * In a Next.js server-component context this is safe — each request gets
 * a fresh module scope. We export a single instance for convenience.
 * If moving to a real CMS, swap this line with the new implementation.
 */
export const portfolioRepository: IPortfolioRepository =
  new StaticPortfolioRepository();

// Re-export individual accessors as named functions for ergonomic DX
export const getProfile          = () => portfolioRepository.getProfile();
export const getAllProjects       = () => portfolioRepository.getAllProjects();
export const getFeaturedProjects  = () => portfolioRepository.getFeaturedProjects();
export const getProjectBySlug    = (s: string) => portfolioRepository.getProjectBySlug(s);
export const getSkillGroups      = () => portfolioRepository.getSkillGroups();
export const getExperiences        = () => portfolioRepository.getExperiences();
export const getEducation          = () => portfolioRepository.getEducation();
export const getVolunteerExperiences = () => portfolioRepository.getVolunteerExperiences();
export const getNavItems           = () => portfolioRepository.getNavItems();
export const getContactInfo        = () => portfolioRepository.getContactInfo();
