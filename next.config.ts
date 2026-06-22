import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for JamBot canvas iframe embedding (cross-origin dev server)
  allowedDevOrigins: ["*.jam-bot.com"],
  images: {
    remotePatterns: [
      // Add client's image CDN or CMS domain here if needed
    ],
  },
};

export default nextConfig;
