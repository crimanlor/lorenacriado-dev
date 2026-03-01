/**
 * cn — Class Name utility
 *
 * Merges clsx (conditional classes) with tailwind-merge (deduplication).
 * This is the standard pattern for component className composition,
 * avoiding both conditional verbosity and Tailwind class conflicts.
 *
 * Usage:
 *   cn("px-4 py-2", isActive && "bg-accent", className)
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * formatDate — Locale-aware date formatter
 *
 * Centralizes date display to avoid inconsistent formatting across components.
 */
export function formatDate(
  isoDate: string,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" }
): string {
  return new Date(isoDate).toLocaleDateString("en-GB", options);
}

/**
 * pluralize — Lightweight pluralization helper
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
