/**
 * Next.js Configuration
 *
 * Performance & security settings:
 *
 * images.remotePatterns — whitelist for next/image external sources.
 *   Add your CDN/CMS domain here when migrating away from static assets.
 *
 * headers — security headers applied to all responses.
 *   These are production-ready defaults. Tighten CSP as needed.
 *
 * compiler.removeConsole — strips console.* calls from production bundles.
 *
 * experimental.optimizeCss — minifies CSS at build time.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image Optimization ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      // Add CMS/CDN domains here when migrating:
      // { protocol: "https", hostname: "images.ctfassets.net" },  // Contentful
      // { protocol: "https", hostname: "*.notion.so" },           // Notion
    ],
  },

  // ─── Security Headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // ─── Build Optimizations ──────────────────────────────────────────────────
  compiler: {
    // Remove console.* calls in production
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ─── Bundle Analysis (uncomment to enable) ────────────────────────────────
  // Run: ANALYZE=true npm run build
  // ...(process.env.ANALYZE === "true" && {
  //   bundleAnalyzer: { enabled: true },
  // }),
};

export default nextConfig;
