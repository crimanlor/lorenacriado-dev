/**
 * Vitest Configuration
 *
 * Architectural decision: Vitest instead of Jest because it:
 * - Shares the same Vite config (near-instant startup)
 * - Has native ESM support (no transform headaches)
 * - Uses Jest-compatible APIs (no migration cost if switching)
 *
 * Test environment: jsdom simulates a browser DOM for component tests.
 * Setup file: configures @testing-library/jest-dom matchers globally.
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom simulates browser APIs for component tests
    environment: "jsdom",

    // Runs before each test file — sets up @testing-library/jest-dom matchers
    setupFiles: ["./src/__tests__/setup.ts"],

    // Only run files matching this pattern
    include: ["src/__tests__/**/*.{test,spec}.{ts,tsx}"],

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/__tests__/**",
        "src/app/**",          // Pages tested via E2E (Playwright/Cypress)
        "src/lib/data/**",     // Pure data, no logic to test
        "**/*.d.ts",
      ],
      thresholds: {
        branches:  80,
        functions: 80,
        lines:     80,
        statements:80,
      },
    },

    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
