/**
 * Tailwind CSS Configuration — Design Token System
 *
 * Architectural decision: all visual values (color, spacing, typography, shadows)
 * are defined as design tokens here and referenced by name throughout the codebase.
 * This enforces a single source of truth, makes theme changes trivial, and aligns
 * with SOLID's Open/Closed Principle — extend, never modify scattered values.
 *
 * Token categories:
 *  - colors     → brand palette + semantic aliases (surface, muted, accent…)
 *  - typography → font families, sizes, line-heights
 *  - spacing    → section rhythm (section-sm/md/lg)
 *  - animation  → micro-interactions
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Dark-mode via class strategy — toggled programmatically
  darkMode: "class",

  theme: {
    extend: {
      // ─── Color Tokens ────────────────────────────────────────────────────────
      colors: {
        // Brand primitives
        brand: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c0d2ff",
          300: "#91aeff",
          400: "#6085ff",
          500: "#3d5eff",   // primary
          600: "#2a3ef5",
          700: "#1f2de0",
          800: "#1b26b5",
          900: "#1b268f",
          950: "#121658",
        },

        // Semantic surface tokens (mapped to CSS vars for dark mode)
        surface: {
          DEFAULT: "var(--color-surface)",
          secondary: "var(--color-surface-secondary)",
          tertiary: "var(--color-surface-tertiary)",
        },

        content: {
          DEFAULT: "var(--color-content)",
          secondary: "var(--color-content-secondary)",
          tertiary: "var(--color-content-tertiary)",
          inverse: "var(--color-content-inverse)",
        },

        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          subtle: "var(--color-accent-subtle)",
        },
      },

      // ─── Typography Tokens ────────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },

      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.1",  letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg":  ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-xl":     ["1.25rem", { lineHeight: "1.8" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.75" }],
        "body-md":     ["1rem",    { lineHeight: "1.7" }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.6" }],
        "label-lg":    ["1rem",    { lineHeight: "1.5",  letterSpacing: "0.05em",  fontWeight: "500" }],
        "label-md":    ["0.875rem",{ lineHeight: "1.5",  letterSpacing: "0.05em",  fontWeight: "500" }],
        "label-sm":    ["0.75rem", { lineHeight: "1.5",  letterSpacing: "0.06em",  fontWeight: "500" }],
      },

      // ─── Spacing Tokens ───────────────────────────────────────────────────────
      spacing: {
        "section-sm": "4rem",
        "section-md": "6rem",
        "section-lg": "8rem",
        "section-xl": "10rem",
      },

      // ─── Shadow Tokens ────────────────────────────────────────────────────────
      boxShadow: {
        "card-rest":  "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        "card-hover": "0 10px 30px -5px rgb(0 0 0 / 0.12), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
        "glow":       "0 0 40px -10px var(--color-accent)",
      },

      // ─── Border Radius Tokens ─────────────────────────────────────────────────
      borderRadius: {
        "card": "1rem",
        "pill": "9999px",
      },

      // ─── Animation Tokens ─────────────────────────────────────────────────────
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in-up":    "fade-in-up 0.5s ease-out forwards",
        "fade-in":       "fade-in 0.4s ease-out forwards",
        "slide-in-right":"slide-in-right 0.5s ease-out forwards",
        "gradient-shift":"gradient-shift 6s ease infinite",
      },

      // ─── Max-Width Container ──────────────────────────────────────────────────
      maxWidth: {
        "prose-lg": "72ch",
        "content":  "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
