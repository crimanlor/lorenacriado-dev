# Portfolio — Technical Documentation

> **Audience:** Engineers joining the project, contributors, or anyone needing to understand the codebase at a technical level.
> **Last updated:** March 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Components](#3-components)
4. [Data Layer & Services](#4-data-layer--services)
5. [Performance](#5-performance)
6. [Best Practices](#6-best-practices)
7. [Developer Guide](#7-developer-guide)
8. [Technical Decisions](#8-technical-decisions)

---

## 1. Project Overview

### Objective

A production-grade personal portfolio for **Lorena Criado Manzaneque**, a Full-Stack Engineer based in Spain. The project serves as both a professional showcase and a reference implementation demonstrating enterprise-level front-end architecture on a relatively small codebase — clean architecture, strict type safety, accessibility compliance, and performance optimization applied consistently from the ground up.

### Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Framework | Next.js App Router | 14.x | Server Components, streaming SSR, built-in image optimization |
| Language | TypeScript | 5.x | Full type safety across domain, data, and UI layers |
| Styling | Tailwind CSS | 3.x | Utility-first with a custom design token system |
| Icons | lucide-react | 0.575 | Tree-shakeable, consistent stroke-width icon set |
| Class utility | clsx + tailwind-merge | latest | Conditional classes with Tailwind conflict resolution |
| Testing | Vitest + Testing Library | 3.x / 16.x | Jest-compatible API, native ESM, near-instant cold start |
| Runtime | Node.js / Vercel Edge | — | Zero-config deployment; static export capable |

### High-Level Architecture

```
Browser
  └── Next.js App Router (Server Components by default)
        ├── Layout (Header + Footer) ── Server Components, fetch data
        ├── Pages (/ /about /projects /contact /projects/[slug])
        │     ├── Server Component shell — fetches data via Repository
        │     └── Client Component islands — interactive fragments only
        └── Streaming SSR via React Suspense
              └── SectionSkeleton fallbacks while async sections resolve
```

The application uses **no external API calls at runtime** — all content is served from static in-memory data via a repository abstraction layer. Components depend on an interface contract, not on the concrete data files, so the data source can be swapped without touching any component code.

---

## 2. Architecture

### Folder Structure

```
portfolio/
├── src/
│   ├── app/                         # Next.js App Router — routes & pages
│   │   ├── layout.tsx               # Root layout: fonts, metadata, Header/Footer
│   │   ├── page.tsx                 # Homepage (/)
│   │   ├── not-found.tsx            # 404 boundary
│   │   ├── robots.ts                # /robots.txt (build-time generated)
│   │   ├── sitemap.ts               # /sitemap.xml (build-time generated)
│   │   ├── globals.css              # CSS custom properties (design tokens)
│   │   ├── about/page.tsx           # /about
│   │   ├── contact/page.tsx         # /contact
│   │   └── projects/
│   │       ├── page.tsx             # /projects (all projects list)
│   │       ├── ProjectsGrid.tsx     # Client Component: filter UI
│   │       └── [slug]/page.tsx      # /projects/:slug (dynamic, SSG)
│   │
│   ├── components/
│   │   ├── layout/                  # Site-level structural components
│   │   │   ├── Header.tsx           # Server Component + nav data
│   │   │   ├── Footer.tsx           # Server Component + social links
│   │   │   ├── MobileMenu.tsx       # Client Component: drawer + Escape key
│   │   │   └── ThemeToggle.tsx      # Client Component: dark/light mode
│   │   ├── features/                # Domain-specific section components
│   │   │   ├── HeroSection.tsx      # Above-fold hero (Server Component)
│   │   │   ├── FeaturedProjects.tsx # Projects grid subset (Server Component)
│   │   │   ├── ProjectCard.tsx      # Individual project card
│   │   │   ├── SkillsSection.tsx    # Skills grouped by category
│   │   │   ├── AboutSection.tsx     # Bio + experience timeline
│   │   │   └── ContactSection.tsx   # CTA + contact links
│   │   ├── ui/                      # Headless/primitive UI building blocks
│   │   │   ├── Button.tsx           # Polymorphic button with variants
│   │   │   ├── Badge.tsx            # Pill label with semantic variants
│   │   │   ├── Card.tsx             # Compound component (Card.Header/Body/Footer)
│   │   │   └── Section.tsx          # Layout shell + SectionHeader
│   │   └── providers/               # (Reserved) Context providers
│   │
│   ├── domain/
│   │   ├── types/index.ts           # All domain entity interfaces & types
│   │   └── interfaces/repositories.ts  # Repository contracts (DIP)
│   │
│   ├── lib/
│   │   ├── data/                    # Concrete repository implementation
│   │   │   ├── index.ts             # StaticPortfolioRepository + named exports
│   │   │   ├── profile.ts           # Profile static data
│   │   │   ├── projects.ts          # Projects static data
│   │   │   ├── skills.ts            # Skills grouped static data
│   │   │   └── experience.ts        # Experience + Education static data
│   │   └── utils/index.ts           # cn(), formatDate(), pluralize()
│   │
│   └── __tests__/
│       ├── setup.ts                 # @testing-library/jest-dom global setup
│       ├── unit/
│       │   ├── Badge.test.tsx       # Component rendering tests
│       │   └── utils.test.ts        # Pure utility function tests
│       └── integration/
│           └── repository.test.ts   # Repository contract tests
│
├── next.config.mjs                  # Next.js: image domains, security headers
├── tailwind.config.ts               # Design token system
├── vitest.config.ts                 # Test runner configuration
└── tsconfig.json                    # TypeScript strict mode
```

### Architectural Principles

#### 1. Server Components by Default

Every component is a React Server Component unless it explicitly requires client-side interactivity. Client Components (`"use client"`) are confined to:

- `MobileMenu.tsx` — open/close state, Escape key listener
- `ThemeToggle.tsx` — localStorage read/write, DOM class mutation
- `ProjectsGrid.tsx` — filter tab state

This minimizes JavaScript sent to the browser. Layout, data fetching, and rendering happen entirely on the server.

#### 2. Clean Architecture (Dependency Inversion)

The codebase is organized in concentric layers. Each layer depends only on the layer **inward** of it:

```
┌─────────────────────────────────────────────┐
│  Presentation Layer (app/, components/)      │
│  — Knows about domain types                 │
│  — Calls repository accessors               │
├─────────────────────────────────────────────┤
│  Application Layer (lib/data/index.ts)       │
│  — StaticPortfolioRepository                │
│  — Implements domain interfaces             │
├─────────────────────────────────────────────┤
│  Domain Layer (domain/)                      │
│  — Types: Profile, Project, Skill…          │
│  — Interfaces: IProjectRepository…          │
│  — No framework dependencies               │
└─────────────────────────────────────────────┘
```

Components depend on the **interface** (`IPortfolioRepository`), not on the concrete static data files. Swapping the data source only requires a new repository class that satisfies the same contract.

#### 3. Islands of Interactivity

Inspired by the Astro Islands pattern, interactive UI is isolated to the smallest possible Client Component boundary. The `Header` is a Server Component; only the `MobileMenu` drawer (which needs `useState`) is a Client Component nested inside it.

#### 4. Single Source of Truth for Visual Design

All colors, spacing, typography, shadows, and border radii are defined once as design tokens in `tailwind.config.ts` and bridged to CSS custom properties in `globals.css`. No raw hex values or pixel values appear in component files.

### Separation of Concerns

| Concern | Where it lives |
|---|---|
| Domain types | `src/domain/types/` |
| Repository contracts | `src/domain/interfaces/` |
| Data access | `src/lib/data/` |
| Shared utilities | `src/lib/utils/` |
| Primitive UI | `src/components/ui/` |
| Layout structure | `src/components/layout/` |
| Domain features | `src/components/features/` |
| Routing & pages | `src/app/` |
| Design tokens | `tailwind.config.ts` + `globals.css` |

### Data Flow

```
Next.js request
      │
      ▼
 Page (Server Component)
      │  calls
      ▼
 lib/data/index.ts  ←── named accessor (e.g., getProfile())
      │  delegates to
      ▼
 StaticPortfolioRepository
      │  implements
      ▼
 IPortfolioRepository  (domain contract)
      │  reads from
      ▼
 Static data files (profile.ts, projects.ts…)
      │
      ▼  returns typed domain objects
 Page renders Server Components → streamed HTML to browser
      │
      ▼  hydrates only Client Component islands
 Browser (minimal JS)
```

---

## 3. Components

### 3.1 Layout Components

Layout components are responsible for the site-wide chrome. They are rendered in `app/layout.tsx` and persist across all page navigations.

---

#### `Header` — `src/components/layout/Header.tsx`

**What it does:** Renders the fixed top navigation bar with the site logo, desktop nav links, theme toggle, and mobile hamburger menu. Fetches its own data (nav items and profile name) as an async Server Component.

**Key decisions:**
- Async Server Component — fetches `navItems` and `profile` in a single `Promise.all`.
- Contains a "Skip to main content" anchor as the first focusable element for keyboard/screen reader users, targeting `#main-content` in the layout.
- Interactive children (`ThemeToggle`, `MobileMenu`) are isolated Client Components to avoid shipping JS for static nav links.

```tsx
// Usage (in layout.tsx — automatically included)
import { Header } from "@/components/layout/Header";
```

---

#### `Footer` — `src/components/layout/Footer.tsx`

**What it does:** Renders the site footer with brand information, social media icon links, and copyright notice. Async Server Component.

**Props:** None — fetches profile data internally.

---

#### `MobileMenu` — `src/components/layout/MobileMenu.tsx`

**What it does:** A hamburger button that opens a full-width slide-down navigation drawer on mobile. Manages open/close state, prevents body scroll while open, and closes on `Escape` key press.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `navItems` | `ReadonlyArray<NavItem>` | Navigation links passed down from `Header` |

**Accessibility:**
- Toggle button: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label` toggles between open/close descriptions.
- Drawer: `role="dialog"`, `aria-modal="true"`.
- Backdrop click closes menu.
- `Escape` key closes menu via `useEffect` listener.

---

#### `ThemeToggle` — `src/components/layout/ThemeToggle.tsx`

**What it does:** A button that switches between light and dark mode. Persists the preference to `localStorage` and applies the `dark` class to `<html>`.

**Props:** None.

**Hydration safety:** Renders a zero-size placeholder (`w-9 h-9`) on the server to prevent layout shift, then shows the correct icon only after mount (`useState(false)` + `useEffect`).

**Interaction with `app/layout.tsx`:** The root layout includes an inline `<script>` (~200 bytes) that runs synchronously before first paint to apply the `dark` class from `localStorage`, eliminating flash of wrong theme on hard reload.

---

### 3.2 UI Components (Primitives)

These are framework-agnostic building blocks with no business logic. They accept arbitrary `className` overrides and forward native HTML attributes.

---

#### `Button` — `src/components/ui/Button.tsx`

**What it does:** A styled, accessible `<button>` element with support for variants, sizes, loading state, and icon slots.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "outline"` | `"primary"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding and font size scale |
| `isLoading` | `boolean` | `false` | Shows spinner, sets `aria-busy`, disables interaction |
| `leftIcon` | `React.ReactNode` | — | Icon rendered before label |
| `rightIcon` | `React.ReactNode` | — | Icon rendered after label |
| `...props` | `ButtonHTMLAttributes` | — | All native button attributes forwarded |

**Example:**

```tsx
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

// Primary CTA
<Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
  View My Work
</Button>

// Loading state
<Button isLoading>Submitting...</Button>

// Outline with icon
<Button variant="outline" leftIcon={<Download size={18} />}>
  Download Resume
</Button>
```

**Notes:**
- Uses `forwardRef` so a parent can hold a ref to the underlying `<button>`.
- `Button.displayName = "Button"` is set for React DevTools clarity.
- Variant and size mappings are defined as `Record<Variant, string>` objects — no runtime branching or template strings.

---

#### `Badge` — `src/components/ui/Badge.tsx`

**What it does:** An inline pill label for statuses, categories, and tags.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "outline" \| "success" \| "warning" \| "info"` | `"default"` | Semantic color variant |
| `children` | `React.ReactNode` | required | Badge text content |
| `className` | `string` | — | Additional Tailwind classes |

**Example:**

```tsx
import { Badge } from "@/components/ui";

<Badge variant="success">Live</Badge>
<Badge variant="warning">In Progress</Badge>
<Badge variant="outline">TypeScript</Badge>
```

---

#### `Card` — `src/components/ui/Card.tsx`

**What it does:** A compound surface container using the Compound Component pattern. Sub-components (`Card.Header`, `Card.Body`, `Card.Footer`) enforce consistent internal spacing without prop drilling.

**Props (root `Card`):**

| Prop | Type | Default | Description |
|---|---|---|---|
| `hoverable` | `boolean` | `false` | Enables lift animation on hover (for interactive cards) |
| `className` | `string` | — | Additional Tailwind classes |
| `children` | `React.ReactNode` | required | — |

**Example:**

```tsx
import { Card } from "@/components/ui";

<Card hoverable>
  <Card.Header>
    <h3>Project Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Description text...</p>
  </Card.Body>
  <Card.Footer>
    <a href="#">GitHub</a>
    <a href="#">Live Demo</a>
  </Card.Footer>
</Card>
```

---

#### `Section` + `SectionHeader` — `src/components/ui/Section.tsx`

**What it does:** `Section` is a layout shell that enforces consistent vertical rhythm, max-width constraints, and background variants across every page section. `SectionHeader` renders a standardized eyebrow/heading/subheading block.

**`Section` Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | Used for anchor navigation (`#skills`) |
| `width` | `"narrow" \| "default" \| "wide" \| "full"` | `"default"` | Max-width constraint |
| `spacing` | `"sm" \| "md" \| "lg" \| "xl"` | `"lg"` | Vertical padding (design token) |
| `bg` | `"default" \| "secondary" \| "accent"` | `"default"` | Background color variant |
| `as` | `keyof JSX.IntrinsicElements` | `"section"` | Rendered HTML element |

**`SectionHeader` Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `heading` | `string` | required | The `<h2>` text |
| `eyebrow` | `string` | — | Small uppercase label above heading |
| `subheading` | `string` | — | Descriptive paragraph below heading |
| `align` | `"left" \| "center"` | `"left"` | Text alignment |

**Example:**

```tsx
import { Section, SectionHeader } from "@/components/ui";

<Section id="projects" bg="secondary" spacing="lg">
  <SectionHeader
    eyebrow="Work"
    heading="Featured Projects"
    subheading="A selection of projects I'm proud of."
    align="center"
  />
  {/* section content */}
</Section>
```

---

### 3.3 Feature (Section) Components

Feature components are domain-specific. They fetch their own data and compose UI primitives to render complete page sections. All are async Server Components unless noted otherwise.

---

#### `HeroSection` — `src/components/features/HeroSection.tsx`

**What it does:** The above-the-fold introduction section — avatar image, name, title, tagline, location, and primary CTAs (View Work, Download Resume).

**Data fetched:** `getProfile()`

**Performance note:** The avatar `<Image>` has `priority={true}` because it is the Largest Contentful Paint (LCP) element. All other images use lazy loading (default).

---

#### `FeaturedProjects` — `src/components/features/FeaturedProjects.tsx`

**What it does:** Renders a 3-column grid of featured project cards on the homepage, with a link to the full projects page.

**Data fetched:** `getFeaturedProjects()` (filters `featured: true`)

---

#### `ProjectCard` — `src/components/features/ProjectCard.tsx`

**What it does:** A single project card: cover image with zoom-on-hover, status badge overlay, title, description (3-line clamp), technology tags, and GitHub/Live Demo action links.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `project` | `Project` | Full project domain object |

**Tag color system:** Tag colors are defined in `projectsData` as color name strings (e.g., `"blue"`, `"green"`). The `tagColorMap` object inside `ProjectCard` maps these names to Tailwind classes, keeping color logic centralized within the component.

---

#### `SkillsSection` — `src/components/features/SkillsSection.tsx`

**What it does:** Displays skills grouped by category (Languages, Frameworks, Databases, Cloud, Methodologies) in a responsive grid. Each skill shows name, years of experience, a proficiency label, and an accessible progress bar.

**Data fetched:** `getSkillGroups()`

**Accessibility:** Progress bars use `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`.

---

#### `AboutSection` — `src/components/features/AboutSection.tsx`

**What it does:** A two-column layout: left column is the bio text; right column is a vertical experience timeline with timeline dots, date ranges, role/company, description, and key highlights.

**Data fetched:** `Promise.all([getProfile(), getExperiences()])`

**Semantic HTML:** Timeline entries use `<ol>` (ordered list) with `<time>` elements carrying `dateTime` attributes for machine readability.

---

#### `ContactSection` — `src/components/features/ContactSection.tsx`

**What it does:** A centered CTA block showing availability status, email and LinkedIn action buttons, and a plain-text email address.

**Data fetched:** `Promise.all([getProfile(), getContactInfo()])`

**Availability states:** `"available"` / `"open-to-offers"` / `"not-available"` — each maps to a distinct color scheme via `availabilityConfig`.

---

### 3.4 Page-Level Client Components

#### `ProjectsGrid` — `src/app/projects/ProjectsGrid.tsx`

**What it does:** A client-only component that holds category filter tab state and renders the filtered list of `ProjectCard` components. The parent page fetches all projects server-side and passes them as props, avoiding any client-side re-fetching on filter changes.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `projects` | `ReadonlyArray<Project>` | All projects, pre-fetched by the server page |

**Pattern:** "Islands of interactivity" — data lives on the server, state lives on the client.

**Performance:** Filtered list is computed with `useMemo` to avoid re-filtering on unrelated renders.

**Accessibility:** Filter buttons use `role="tab"` and `aria-selected`. A visually-hidden `aria-live="polite"` region announces filter result counts to screen readers.

---

## 4. Data Layer & Services

### Overview

The data layer follows the **Repository pattern** with Dependency Inversion. Components never import static data files directly — they always call named accessor functions that delegate to the active repository implementation.

```
components/features/HeroSection.tsx
  └── import { getProfile } from "@/lib/data"
        └── portfolioRepository.getProfile()
              └── StaticPortfolioRepository
                    └── profileData (static object)
```

### Domain Types — `src/domain/types/index.ts`

All entity shapes are defined here, completely framework-agnostic. The file also exports lightweight **branded types** to prevent accidental misuse:

```typescript
// Branded types — prevent passing a plain string where a Url is expected
type Url     = string & { readonly __brand: "Url" };
type ISODate = string & { readonly __brand: "ISODate" };

// Safe constructors
const asUrl     = (s: string): Url     => s as Url;
const asISODate = (s: string): ISODate => s as ISODate;
```

**Entities defined:**

| Entity | Key fields |
|---|---|
| `Profile` | `name`, `title`, `tagline`, `bio`, `location`, `social`, `avatarUrl`, `resumeUrl` |
| `Project` | `id`, `slug`, `title`, `description`, `tags`, `status`, `featured`, `publishedAt` |
| `Skill` / `SkillGroup` | `name`, `category`, `level`, `yearsOfExperience` |
| `Experience` | `company`, `role`, `startDate`, `endDate`, `highlights`, `technologies` |
| `Education` | `institution`, `degree`, `field`, `startDate`, `endDate` |
| `ContactInfo` | `email`, `availability`, `preferredContact` |
| `NavItem` | `label`, `href`, `external` |

### Repository Interfaces — `src/domain/interfaces/repositories.ts`

```typescript
// Example — any data source must satisfy this contract
interface IProjectRepository {
  getAllProjects(): Promise<ReadonlyArray<Project>>;
  getFeaturedProjects(): Promise<ReadonlyArray<Project>>;
  getProjectBySlug(slug: string): Promise<Project | null>;
}

// Aggregate interface used by the application
interface IPortfolioRepository extends
  IProfileRepository,
  IProjectRepository,
  ISkillRepository,
  IExperienceRepository,
  IEducationRepository,
  IContactRepository,
  INavigationRepository {}
```

### Concrete Implementation — `src/lib/data/index.ts`

`StaticPortfolioRepository` implements `IPortfolioRepository` by resolving static in-memory data wrapped in `Promise.resolve()`. The async wrapper is intentional: it keeps the calling code consistent (`await getProfile()`) and makes the interface contract honest — all repository methods are async regardless of whether the underlying source is synchronous or not.

```typescript
class StaticPortfolioRepository implements IPortfolioRepository {
  async getProfile()     { return Promise.resolve(profileData); }
  async getAllProjects()  { return Promise.resolve(projectsData); }
  // …
  async getFeaturedProjects() {
    return Promise.resolve(projectsData.filter((p) => p.featured));
  }
  async getProjectBySlug(slug: string) {
    return Promise.resolve(projectsData.find((p) => p.slug === slug) ?? null);
  }
}

// Singleton exported for the application
export const portfolioRepository: IPortfolioRepository =
  new StaticPortfolioRepository();
```

### Named Accessors (public API)

```typescript
// Consumers import these — never the repository class directly
export const getProfile         = () => portfolioRepository.getProfile();
export const getAllProjects      = () => portfolioRepository.getAllProjects();
export const getFeaturedProjects = () => portfolioRepository.getFeaturedProjects();
export const getProjectBySlug   = (s: string) => portfolioRepository.getProjectBySlug(s);
export const getSkillGroups     = () => portfolioRepository.getSkillGroups();
export const getExperiences     = () => portfolioRepository.getExperiences();
export const getEducation       = () => portfolioRepository.getEducation();
export const getNavItems        = () => portfolioRepository.getNavItems();
export const getContactInfo     = () => portfolioRepository.getContactInfo();
```

### Error Handling

**Current state (static data):** No runtime errors are possible from data fetching because the data is in-process memory. `getProjectBySlug` returns `null` for unknown slugs; the page calls Next.js `notFound()` to render the 404 boundary.

### SEO Infrastructure

The data layer feeds two auto-generated files at build time:

- **`src/app/sitemap.ts`** — Combines static routes (`/`, `/about`, `/projects`, `/contact`) with dynamic project slugs. Featured projects receive higher priority (`0.8`) than unfeatured (`0.6`).
- **`src/app/robots.ts`** — Allows all crawlers on all paths and points to the sitemap URL.

Per-page metadata is defined via `export const metadata` in each page file, inheriting the base template from `layout.tsx` (`"%s | Lorena Criado"`).

---

## 5. Performance

### Strategy Overview

Performance optimization is applied at multiple levels: network, rendering, JavaScript, images, and CSS.

### Server Components & Streaming SSR

The most impactful optimization is architectural: by using React Server Components throughout, the application sends pre-rendered HTML to the browser with no client-side JavaScript for purely presentational components. The JavaScript bundle is only hydrated for Client Component islands (`MobileMenu`, `ThemeToggle`, `ProjectsGrid`).

Homepage sections are wrapped in `<Suspense>` to enable streaming SSR:

```tsx
// app/page.tsx
// HeroSection (above fold) — renders eagerly, no Suspense delay
<Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
  <Hero />  {/* LCP-critical, streams first */}
</Suspense>

// Below-fold sections stream independently as they resolve
<Suspense fallback={<SectionSkeleton />}>
  <Projects />
</Suspense>
```

`SectionSkeleton` is a lightweight animated placeholder (`animate-pulse`) that prevents layout shift during streaming and gives users visual feedback immediately.

### Image Optimization

All images go through Next.js `<Image>`, which provides:
- **Automatic format negotiation:** AVIF first, WebP fallback (configured in `next.config.mjs`: `formats: ["image/avif", "image/webp"]`).
- **Responsive `srcset`** via the `sizes` attribute — browsers download the smallest image that covers the viewport.
- **Lazy loading** by default for all images below the fold.
- **`priority` flag** on the hero avatar (`HeroSection.tsx`) forces eager loading of the LCP image.
- **`quality={90}`** on the LCP image balances visual fidelity and file size.

```tsx
// HeroSection.tsx — LCP image, loaded immediately
<Image
  src={profile.avatarUrl}
  alt={`Portrait of ${profile.name}`}
  fill
  sizes="(max-width: 1024px) 288px, 320px"
  priority    // preload: eager
  quality={90}
/>

// ProjectCard.tsx — lazy loading (default)
<Image
  src={project.imageUrl}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  // no priority — below fold
/>
```

### Font Loading

Fonts are loaded via `next/font/google` in `layout.tsx`. Next.js self-hosts them (no DNS lookup to Google Fonts), subsets to Latin only, and uses `display: "swap"` to show system fonts immediately while the custom font loads (FOUT, not FOIT).

```tsx
const inter = Inter({
  subsets: ["latin"],
  display: "swap",          // show text immediately
  variable: "--font-sans",  // CSS custom property
});
```

### Dark Mode Flash Prevention

A ~200-byte inline `<script>` in `<head>` runs synchronously before first paint. It reads `localStorage.getItem("theme")` and conditionally adds the `dark` class to `<html>`, eliminating the flash of wrong theme that would otherwise appear on hard reload.

### JavaScript Bundle Size

- **No animation libraries** — all micro-interactions use CSS `@keyframes` defined in `tailwind.config.ts`.
- **Tree-shakeable icons** — `lucide-react` is tree-shaken; only imported icons are bundled.
- **`removeConsole`** in `next.config.mjs` strips `console.log/info/debug` from the production bundle, keeping only `console.error` and `console.warn`.

### Production Build Optimizations (`next.config.mjs`)

```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === "production"
    ? { exclude: ["error", "warn"] }
    : false,
},
images: {
  formats: ["image/avif", "image/webp"],
},
```

### Security Headers

All responses include the following HTTP security headers:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `X-DNS-Prefetch-Control` | `on` |

---

## 6. Best Practices

### Accessibility (WCAG 2.1 AA)

Accessibility is treated as a first-class requirement, not an afterthought.

**Keyboard navigation:**
- All interactive elements have visible `:focus-visible` outlines using the `--color-accent` CSS variable.
- `:focus:not(:focus-visible)` removes the outline for mouse users, preserving it only for keyboard users.
- The `Header` contains a visually hidden "Skip to main content" link as the first focusable element, jumping to `#main-content` on activation.

**Screen readers:**
- Decorative elements: `aria-hidden="true"` on icons, background gradients, and decorative dots.
- Interactive labels: `aria-label` on buttons and links where the visual label alone is insufficient (e.g., `aria-label="View Enterprise SaaS Platform source code on GitHub"`).
- Live regions: `aria-live="polite"` in `ProjectsGrid` announces filter result counts.
- Semantic HTML: `<nav>` with `aria-label`, `<ul role="list">` for project/skills/nav lists, `<ol>` for the timeline, `<time dateTime>` for dates, `<article>` for project detail pages.

**Reduced motion:**
```css
/* globals.css — respects user's OS preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Progress bars:** `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` in `SkillsSection`.

### SEO

- **Metadata hierarchy:** Root `layout.tsx` defines base metadata with a title template (`"%s | Lorena Criado"`). Each page overrides `title` and `description`. Dynamic project pages use `generateMetadata` for per-project OG tags.
- **Open Graph + Twitter cards:** Defined in root metadata and overridden per-project with project cover images.
- **Structured HTML:** Proper heading hierarchy (`h1` per page, `h2` for sections, `h3` for cards/timeline entries). Semantic sectioning with `<header>`, `<main>`, `<footer>`, `<article>`, `<aside>`, `<nav>`.
- **Static sitemap and robots.txt:** Auto-generated at build time from route data.
- **`metadataBase`:** Set in `layout.tsx` so relative OG image paths resolve correctly.

### Design Token System

Visual decisions are made once, in `tailwind.config.ts`, and referenced everywhere by semantic name. This provides:
- **Consistency:** Every component uses the same spacing, color, and shadow values.
- **Refactorability:** Changing a token propagates everywhere automatically.
- **Dark mode:** All color tokens resolve to CSS custom properties, switched by the `.dark` class on `<html>`.

```
tailwind.config.ts       →  semantic token names (e.g., text-content-secondary)
globals.css :root        →  light mode values    (e.g., #4b5563)
globals.css .dark        →  dark mode values     (e.g., #94a3b8)
```

### Clean Code

**`cn()` utility:** Combines `clsx` (conditional class composition) and `tailwind-merge` (Tailwind conflict resolution). All component `className` merging goes through `cn()` — no string concatenation, no ternary chains in JSX.

```typescript
// lib/utils/index.ts
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

**Barrel exports:** `src/components/ui/index.ts` and `src/components/features/index.ts` provide single-import-point exports.

```typescript
// Instead of:
import { Button } from "@/components/ui/Button";
import { Badge }  from "@/components/ui/Badge";

// Consumers write:
import { Button, Badge } from "@/components/ui";
```

**Read-only data:** All domain data structures use `readonly` and `ReadonlyArray<T>`, preventing accidental mutation at compile time.

### Testing

Tests are organized into two distinct categories:

**Unit tests** (`src/__tests__/unit/`) — test pure functions and isolated component rendering:
- `utils.test.ts` — `cn()`, `formatDate()`, `pluralize()` with edge cases
- `Badge.test.tsx` — component renders correctly for each variant

**Integration tests** (`src/__tests__/integration/`) — test the repository contract:
- `repository.test.ts` — verifies that `StaticPortfolioRepository` returns correctly shaped data for all accessors

**Philosophy:** Tests target behavior, not implementation. Integration tests test the *contract* (`IPortfolioRepository`) rather than the *implementation* (`StaticPortfolioRepository`), so they remain valid if the repository implementation ever changes.

**Coverage thresholds** (enforced in CI via `vitest run --coverage`):
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

---

## 7. Developer Guide

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Running the Project

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Type-check without emitting (useful in CI or pre-commit)
npm run type-check

# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report (HTML report in ./coverage/)
npm run test:coverage

# Production build
npm run build

# Start production server locally
npm run start

# Lint
npm run lint
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://lorenacriado.dev` | Used by sitemap and robots.txt for absolute URLs |

For local development, create a `.env.local` file:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Adding a New Page

1. Create the route file: `src/app/<route>/page.tsx`
2. Export `metadata` for SEO:
   ```typescript
   import type { Metadata } from "next";
   export const metadata: Metadata = {
     title: "Page Title",
     description: "Page description for SEO.",
   };
   ```
3. Add the route to `navItems` in `src/lib/data/index.ts` if it should appear in the navigation.
4. Add it to `sitemap.ts` if it should be indexed.

### Adding a New UI Component

1. Create `src/components/ui/MyComponent.tsx`.
2. Define props as a TypeScript `interface` with JSDoc comments.
3. Use `cn()` from `@/lib/utils` for `className` composition.
4. Export it from `src/components/ui/index.ts`.
5. Write a unit test in `src/__tests__/unit/MyComponent.test.tsx`.

**Template:**

```tsx
// src/components/ui/MyComponent.tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  /** Description of what this prop does */
  variant?: "default" | "highlight";
  children: React.ReactNode;
  className?: string;
}

export function MyComponent({
  variant = "default",
  children,
  className,
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "base-classes",
        variant === "highlight" && "highlight-classes",
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Adding a New Feature Section

Feature sections are async Server Components that fetch their own data and compose UI primitives.

1. Create `src/components/features/MySection.tsx`.
2. Fetch data using the repository accessors (`getProfile`, `getSkillGroups`, etc.).
3. Compose using `Section`, `SectionHeader`, `Card`, `Badge`, `Button` from `@/components/ui`.
4. Export from `src/components/features/index.ts`.
5. Wrap with `<Suspense fallback={<SectionSkeleton />}>` in the page.

```tsx
// src/components/features/MySection.tsx
import { Section, SectionHeader } from "@/components/ui/Section";
import { getSomeData } from "@/lib/data";

export async function MySection() {
  const data = await getSomeData();

  return (
    <Section id="my-section" spacing="lg">
      <SectionHeader
        eyebrow="Category"
        heading="Section Heading"
        subheading="Descriptive subtitle."
      />
      {/* section content */}
    </Section>
  );
}
```

### Adding New Data

All data edits are confined to `src/lib/data/`:

- **New project:** Add an entry to `projectsData` in `projects.ts` following the `Project` type.
- **New skill:** Add to the appropriate `SkillGroup` in `skills.ts`.
- **New experience:** Add to `experienceData` in `experience.ts`.
- **Profile update:** Edit `profileData` in `profile.ts`.

No component code needs to change. Types are enforced — TypeScript will error on any missing required field.

### Adding a New Hook

There are no custom hooks in the codebase at present (`src/lib/hooks/` is empty). When adding one:

1. Create `src/lib/hooks/useMyHook.ts`.
2. Follow the naming convention `use[PascalCase]`.
3. Document the problem it solves, its parameters, and return value with JSDoc.
4. Export from a barrel `src/lib/hooks/index.ts`.
5. Write a unit test using `renderHook` from `@testing-library/react`.

**Template:**

```typescript
// src/lib/hooks/useLocalStorage.ts

/**
 * useLocalStorage — syncs a state value with localStorage.
 *
 * Problem solved: eliminates repetitive localStorage boilerplate across
 * Client Components that need persistent state.
 *
 * @param key    - The localStorage key
 * @param initial - Value used if the key doesn't exist
 * @returns [value, setValue] — same API as useState
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValueState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  const setValue = (v: T) => {
    localStorage.setItem(key, JSON.stringify(v));
    setValueState(v);
  };

  return [value, setValue];
}
```

### Deploying

**Vercel (recommended):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Set `NEXT_PUBLIC_BASE_URL` to the production domain in the Vercel dashboard under Project → Settings → Environment Variables.

**Static export:**

To export as a fully static site (no Node.js server needed):

```javascript
// next.config.mjs
const nextConfig = {
  output: "export",
  // ...
};
```

Then run `npm run build` — output goes to `./out/`.

**Custom server / Docker:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Requires `output: "standalone"` in `next.config.mjs`.

---

## 8. Technical Decisions

### Why Next.js 14 App Router?

The App Router enables React Server Components, which is the primary performance lever. Rendering on the server means:
- HTML is delivered pre-built — no blank-page flicker while JS hydrates.
- Data fetching happens at the server, with no round-trips from the browser.
- The JS bundle shipped to the browser contains only the Client Component islands.

The alternative (Pages Router or a pure SPA) would require client-side data fetching, increasing Time to Interactive and requiring either `getServerSideProps` or a state management library.

### Why a Repository Pattern for Static Data?

The current data source is static TypeScript objects — the simplest possible implementation. The repository pattern adds a thin abstraction layer that decouples the presentation layer from the data layer:

**Without it:** Components import `projectsData` directly. Any restructuring of the data layer requires editing every component that touches that data.

**With it:** Components call `getProjects()`. The data implementation is entirely encapsulated — the rest of the codebase has no knowledge of where the data comes from or how it is shaped internally.

The cost is minimal (one extra file, one interface definition). The benefit is a cleaner separation of concerns and a codebase where data and presentation evolve independently.

### Why Vitest instead of Jest?

- **Startup time:** Vitest reuses the Vite build pipeline — test startup is near-instant vs. several seconds for Jest with a TypeScript transform.
- **Native ESM:** No `babel-jest` or `ts-jest` configuration required.
- **API compatibility:** Vitest uses the same `describe`, `it`, `expect` API as Jest, so tests are portable if the project ever switches.
- **Tradeoff:** Slightly younger ecosystem, fewer plugins. Acceptable for this project's test scope.

### Why Tailwind CSS with a Custom Token System?

Utility-first CSS solves co-location: styles live next to the markup they apply to, eliminating the "which class is used where?" problem common in traditional CSS architectures. However, raw Tailwind classes scattered with arbitrary values undermine consistency.

The token system in `tailwind.config.ts` solves this: every visual decision is made once at the token level. Components reference semantic names (`text-content-secondary`, `bg-surface`) rather than concrete values (`text-gray-500`, `bg-white`). Dark mode is implemented by swapping CSS custom properties, not by duplicating class lists with `dark:` prefixes everywhere.

### Why No State Management Library?

The application has essentially no global shared state. The only interactive states are:
- Theme preference (localStorage, isolated to `ThemeToggle`)
- Mobile menu open/close (local to `MobileMenu`)
- Project category filter (local to `ProjectsGrid`)

Adding Redux, Zustand, or Jotai would be premature abstraction. React's built-in `useState` + `useEffect` is sufficient and keeps the bundle lean.

### Why Branded Types for `Url` and `ISODate`?

TypeScript's structural type system would otherwise treat any `string` as interchangeable with a URL or an ISO date string. Branded types (also called nominal types) create distinct type identities at zero runtime cost:

```typescript
type Url = string & { readonly __brand: "Url" };

// TypeScript will error if you accidentally pass a plain string
const getProfile = (): Profile => ({ avatarUrl: "/avatar.png" }); // Error!
const getProfile = (): Profile => ({ avatarUrl: asUrl("/avatar.png") }); // OK
```

This prevents entire classes of bugs (wrong-string-in-wrong-field) that are otherwise invisible until runtime.

### Tradeoffs

| Decision | Benefit | Tradeoff |
|---|---|---|
| Server Components by default | Minimal JS bundle, SEO-ready HTML | Harder to add interactivity — requires extracting Client Components |
| Static data repository | Zero external dependencies, instant CI | Content updates require a code deploy |
| Tailwind CSS tokens | Consistent design, trivial dark mode | Token system adds initial setup complexity |
| No state management library | Lean bundle, simple mental model | Scales poorly if global state becomes needed |
| Branded types | Prevents wrong-string bugs | Requires `asUrl()` / `asISODate()` constructors everywhere in data files |
| Vitest over Jest | Near-instant startup | Slightly smaller ecosystem |

---

*Documentation generated from source analysis. Keep this document updated when making structural or architectural changes.*
