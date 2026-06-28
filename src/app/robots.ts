import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Required under `output: export` — metadata route handlers must be force-static.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
