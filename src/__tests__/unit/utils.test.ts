/**
 * Unit Tests — cn utility
 *
 * Tests for the class name merging utility.
 * Demonstrates the testing pattern: pure functions are easiest to test.
 *
 * Run: npm run test
 */

import { describe, it, expect } from "vitest";
import { cn, formatDate, pluralize } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("px-4", false && "py-2", "rounded")).toBe("px-4 rounded");
  });

  it("deduplicates conflicting Tailwind classes (tailwind-merge)", () => {
    // tailwind-merge should resolve px-4 + px-6 → px-6 (last wins)
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles undefined/null gracefully", () => {
    expect(cn("px-4", undefined, null as unknown as string)).toBe("px-4");
  });
});

describe("formatDate", () => {
  it("formats ISO date to readable string", () => {
    const result = formatDate("2024-09-01");
    // Should contain year and abbreviated month
    expect(result).toMatch(/2024/);
  });

  it("accepts custom format options", () => {
    const result = formatDate("2024-09-01", { year: "numeric", month: "long" });
    expect(result).toMatch(/September/);
  });
});

describe("pluralize", () => {
  it("returns singular for count of 1", () => {
    expect(pluralize(1, "project")).toBe("project");
  });

  it("returns plural for count !== 1", () => {
    expect(pluralize(3, "project")).toBe("projects");
    expect(pluralize(0, "project")).toBe("projects");
  });

  it("uses custom plural form when provided", () => {
    expect(pluralize(2, "child", "children")).toBe("children");
  });
});
