/**
 * Repository Interfaces — Dependency Inversion layer
 *
 * These interfaces define the *contract* for data access without coupling the
 * application to any specific data source. Following the Dependency Inversion
 * Principle (D in SOLID), upper layers depend on these abstractions, not on the
 * concrete implementations in /lib/data.
 *
 * Migration path:
 *   1. Today:   StaticDataRepository (JSON objects in /lib/data)
 *   2. Later:   NotionRepository     (Notion API via @notionhq/client)
 *   3. Later:   ContentfulRepository (Contentful SDK)
 *
 * Only the repository implementation changes — pages, components and hooks
 * remain completely unaffected.
 */

import type {
  Profile,
  Project,
  SkillGroup,
  Experience,
  Education,
  VolunteerExperience,
  ContactInfo,
  NavItem,
} from "@/domain/types";

export interface IProfileRepository {
  getProfile(): Promise<Profile>;
}

export interface IProjectRepository {
  getAllProjects(): Promise<ReadonlyArray<Project>>;
  getFeaturedProjects(): Promise<ReadonlyArray<Project>>;
  getProjectBySlug(slug: string): Promise<Project | null>;
}

export interface ISkillRepository {
  getSkillGroups(): Promise<ReadonlyArray<SkillGroup>>;
}

export interface IExperienceRepository {
  getExperiences(): Promise<ReadonlyArray<Experience>>;
}

export interface IVolunteerRepository {
  getVolunteerExperiences(): Promise<ReadonlyArray<VolunteerExperience>>;
}

export interface IEducationRepository {
  getEducation(): Promise<ReadonlyArray<Education>>;
}

export interface IContactRepository {
  getContactInfo(): Promise<ContactInfo>;
}

export interface INavigationRepository {
  getNavItems(): Promise<ReadonlyArray<NavItem>>;
}

/**
 * Aggregate repository — bundles all sub-repositories.
 * Useful to inject a single dependency into server components or services.
 */
export interface IPortfolioRepository
  extends IProfileRepository,
    IProjectRepository,
    ISkillRepository,
    IExperienceRepository,
    IVolunteerRepository,
    IEducationRepository,
    IContactRepository,
    INavigationRepository {}
