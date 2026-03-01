/**
 * Footer — Site footer with links and attribution
 */

import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { getProfile } from "@/lib/data";

const iconMap = {
  github:   Github,
  linkedin: Linkedin,
  email:    Mail,
  twitter:  ExternalLink,
  website:  ExternalLink,
};

export async function Footer() {
  const profile = await getProfile();

  return (
    <footer
      className="bg-surface-secondary border-t border-border"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-label-md text-content font-semibold">
              {profile.name}
            </p>
            <p className="text-body-sm text-content-secondary mt-1">
              {profile.title}
            </p>
          </div>

          {/* Social links */}
          <nav             aria-label="Redes sociales">
            <ul className="flex items-center gap-4" role="list">
              {profile.social.map((link) => {
                const Icon = iconMap[link.platform] ?? ExternalLink;
                return (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target={link.platform !== "email" ? "_blank" : undefined}
                      rel={link.platform !== "email" ? "noopener noreferrer" : undefined}
                      aria-label={`${profile.name} en ${link.label}`}
                      className={[
                        "p-2 rounded-md text-content-tertiary hover:text-accent",
                        "transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      ].join(" ")}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-body-sm text-content-tertiary">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-body-sm text-content-tertiary">
            Construido con{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              Next.js 14
            </a>
            {" & "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
