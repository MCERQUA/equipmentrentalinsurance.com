import type { MetadataRoute } from "next";
import { SITE, SERVICES, LOCATIONS } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/coverage`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/quote`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({ url: `${base}/locations/${l.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));
  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.6 }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...postRoutes];
}
