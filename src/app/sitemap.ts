import type { MetadataRoute } from "next";

const BASE_URL = "https://www.tanzaniareach.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Primary Static Pages - Only clean canonical URLs
  const routes = [
    { url: "", priority: 1.0, changefreq: "daily" },
    { url: "/about", priority: 0.8, changefreq: "monthly" },
    { url: "/contact", priority: 0.8, changefreq: "monthly" },
    { url: "/privacy", priority: 0.3, changefreq: "yearly" },
    { url: "/guides", priority: 0.9, changefreq: "weekly" },
    { url: "/visa", priority: 0.8, changefreq: "monthly" },
    { url: "/agriculture", priority: 0.8, changefreq: "monthly" },
    { url: "/corporate", priority: 0.8, changefreq: "monthly" },
    { url: "/infrastructure", priority: 0.8, changefreq: "monthly" },
    { url: "/banking", priority: 0.8, changefreq: "monthly" },
    { url: "/wildlife", priority: 0.8, changefreq: "monthly" },
    { url: "/healthcare", priority: 0.8, changefreq: "monthly" },
    { url: "/housing", priority: 0.8, changefreq: "monthly" },
    { url: "/culture", priority: 0.8, changefreq: "monthly" },
    { url: "/transport", priority: 0.8, changefreq: "monthly" },
    { url: "/food-and-drink", priority: 0.8, changefreq: "monthly" },
    { url: "/entertainment", priority: 0.8, changefreq: "monthly" },
    { url: "/phrasebook", priority: 0.8, changefreq: "monthly" },
    { url: "/directory", priority: 0.8, changefreq: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: now,
    changeFrequency: route.changefreq as any,
    priority: route.priority,
  }));
}
