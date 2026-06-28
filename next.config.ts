import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — REQUIRED for Netlify Forms to register/capture leads. The
  // @netlify/plugin-nextjs runtime intercepts form POSTs and prevents Netlify from
  // scanning static HTML forms at build time (forms=0). Static export emits plain HTML
  // (incl. public/__forms.html) that the Netlify form backend detects directly.
  output: "export",
  // Required for next/image under static export (no server-side optimizer).
  images: {
    unoptimized: true,
    remotePatterns: [
      // Add client's image CDN or CMS domain here if needed
    ],
  },
  // Required for JamBot canvas iframe embedding (cross-origin dev server)
  allowedDevOrigins: ["*.jam-bot.com"],
};

export default nextConfig;
