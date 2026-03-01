/**
 * Integration Tests — Data Repository
 *
 * Tests the static repository implementation against the interface contract.
 * If the data source changes (static → Notion API), these tests still pass
 * because they test the contract, not the implementation.
 *
 * Run: npm run test
 */

import { describe, it, expect } from "vitest";
import {
  getProfile,
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getSkillGroups,
} from "@/lib/data";

describe("Portfolio Repository — Profile", () => {
  it("returns a profile with required fields", async () => {
    const profile = await getProfile();
    expect(profile.name).toBeTruthy();
    expect(profile.title).toBeTruthy();
    expect(profile.bio).toBeTruthy();
    expect(profile.social).toBeInstanceOf(Array);
  });

  it("returns at least one social link", async () => {
    const profile = await getProfile();
    expect(profile.social.length).toBeGreaterThan(0);
  });
});

describe("Portfolio Repository — Projects", () => {
  it("returns an array of projects", async () => {
    const projects = await getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required shape", async () => {
    const projects = await getAllProjects();
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(["live", "wip", "archived"]).toContain(project.status);
    }
  });

  it("getFeaturedProjects returns only featured projects", async () => {
    const featured = await getFeaturedProjects();
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it("getProjectBySlug returns correct project", async () => {
    const all = await getAllProjects();
    const first = all[0];
    const found = await getProjectBySlug(first.slug);
    expect(found?.id).toBe(first.id);
  });

  it("getProjectBySlug returns null for unknown slug", async () => {
    const result = await getProjectBySlug("does-not-exist-xyz");
    expect(result).toBeNull();
  });
});

describe("Portfolio Repository — Skills", () => {
  it("returns skill groups with skills", async () => {
    const groups = await getSkillGroups();
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  it("each skill has a valid level", async () => {
    const groups = await getSkillGroups();
    const validLevels = ["learning", "proficient", "expert"];
    for (const group of groups) {
      for (const skill of group.skills) {
        expect(validLevels).toContain(skill.level);
      }
    }
  });
});
