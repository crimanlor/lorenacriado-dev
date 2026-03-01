/**
 * MobileMenu — Client Component
 *
 * Isolated as a Client Component so the main Header can remain a
 * Server Component. This minimizes the JS sent to the browser —
 * only the interactive toggle/drawer requires client-side JS.
 *
 * Accessibility:
 * - aria-expanded on the toggle button
 * - aria-label describes the open/close action
 * - Focus trap (Escape key closes menu)
 * - Menu role="dialog" with aria-modal
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import type { NavItem } from "@/domain/types";

interface MobileMenuProps {
  navItems: ReadonlyArray<NavItem>;
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-menu"
        className={[
          "p-2 rounded-md text-content-secondary hover:text-content hover:bg-surface-secondary",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        ].join(" ")}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {/* Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />

          {/* Menu panel */}
          <nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={[
              "fixed top-16 left-0 right-0 z-50",
              "bg-surface border-b border-border shadow-card-hover",
              "animate-fade-in-up",
            ].join(" ")}
          >
            <ul className="flex flex-col p-4 gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={[
                      "block px-4 py-3 rounded-md text-body-md text-content-secondary",
                      "hover:text-content hover:bg-surface-secondary",
                      "transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
