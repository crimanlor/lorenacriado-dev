/**
 * Domain Types — Portfolio
 *
 * Architectural decision: domain types live in /domain/types, completely
 * decoupled from any framework or persistence layer. If we swap the data
 * source (static JSON → Notion API → GraphQL CMS), only /lib/data changes;
 * the rest of the codebase stays untouched (Dependency Inversion Principle).
 */

// ─── Primitive value types ────────────────────────────────────────────────────

export type Url   = string & { readonly __brand: "Url" };
export type ISODate = string & { readonly __brand: "ISODate" };

// Safe constructors (lightweight branded types without runtime overhead)
export const asUrl     = (s: string): Url     => s as Url;
export const asISODate = (s: string): ISODate => s as ISODate;

// ─── Profile ──────────────────────────────────────────────────────────────────

export interface SocialLink {
  readonly platform: "github" | "linkedin" | "twitter" | "email" | "website";
  readonly url: Url;
  readonly label: string;
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly bio: string;
  readonly location: string;
  readonly avatarUrl: Url;
  readonly social: ReadonlyArray<SocialLink>;
  readonly resumeUrl?: Url;
}

// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = "live" | "wip" | "archived";
export type ProjectCategory = "fullstack" | "frontend" | "backend" | "oss" | "tool";

export interface ProjectTag {
  readonly label: string;
  readonly color: string; // Tailwind color class, e.g. "blue", "green"
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly imageUrl: Url;
  readonly tags: ReadonlyArray<ProjectTag>;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly githubUrl?: Url;
  readonly liveUrl?: Url;
  readonly featured: boolean;
  readonly publishedAt: ISODate;
}

// ─── Skill ───────────────────────────────────────────────────────────────────

export type SkillLevel = "learning" | "proficient" | "expert";

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category: "language" | "framework" | "database" | "cloud" | "tooling" | "methodology";
  readonly level: SkillLevel;
  readonly yearsOfExperience: number;
  readonly iconName?: string; // name key for icon mapping
}

export interface SkillGroup {
  readonly category: Skill["category"];
  readonly label: string;
  readonly skills: ReadonlyArray<Skill>;
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly startDate: ISODate;
  readonly endDate?: ISODate; // undefined = current
  readonly description: string;
  readonly highlights: ReadonlyArray<string>;
  readonly technologies: ReadonlyArray<string>;
  readonly companyUrl?: Url;
}

// ─── Volunteer Experience ─────────────────────────────────────────────────────

export interface VolunteerExperience {
  readonly id: string;
  readonly organization: string;
  readonly role: string;
  readonly startDate: ISODate;
  readonly endDate?: ISODate; // undefined = en curso
  readonly description: string;
  readonly highlights: ReadonlyArray<string>;
  readonly organizationUrl?: Url;
}

// ─── Education ───────────────────────────────────────────────────────────────

export interface Education {
  readonly id: string;
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
  readonly startDate: ISODate;
  readonly endDate?: ISODate;
  readonly description?: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactInfo {
  readonly email: string;
  readonly availability: "available" | "open-to-offers" | "not-available";
  readonly preferredContact: "email" | "linkedin";
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}
