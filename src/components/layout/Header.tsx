/**
 * Header — Site-level navigation
 *
 * Architectural decisions:
 * - Server Component by default; mobile menu state is isolated to a
 *   separate Client Component (MobileMenu) to minimize the JS bundle.
 * - Navigation data comes from the repository, keeping the component
 *   decoupled from data concerns (Single Responsibility).
 * - Scroll-aware styling (backdrop blur on scroll) is handled in the
 *   client wrapper without re-rendering the full nav tree.
 */

import Link from "next/link";
import { getNavItems, getProfile } from "@/lib/data";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const [navItems, profile] = await Promise.all([getNavItems(), getProfile()]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50",
        "bg-surface/80 backdrop-blur-md border-b border-border/60",
        "transition-all duration-300",
      ].join(" ")}
      role="banner"
    >
      {/* Skip-to-content link — first focusable element for keyboard/screen reader users */}
      <a
        href="#main-content"
        className={[
          "sr-only focus:not-sr-only",
          "focus:absolute focus:top-4 focus:left-4 focus:z-[100]",
          "focus:bg-accent focus:text-content-inverse focus:px-4 focus:py-2 focus:rounded-pill",
          "focus:text-label-md focus:outline-none",
        ].join(" ")}
      >
        Saltar al contenido principal
      </a>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link
            href="/"
            className={[
              "text-label-lg text-content font-semibold tracking-tight",
              "hover:text-accent transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
            ].join(" ")}
            aria-label={`${profile.name} — inicio`}
          >
            <span className="text-accent">{"{"}</span>
            {profile.name.split(" ")[0]}
            <span className="text-accent">{"}"}</span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={[
                  "px-3 py-1.5 rounded-md text-label-md",
                  "text-content-secondary hover:text-content hover:bg-surface-secondary",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile menu — client component for interactivity */}
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
