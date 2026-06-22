import type { MetadataRoute } from "next";
import { dogs } from "../data/dogs";
import { getDogSlug, siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/raser`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/uppfodare`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const dogRoutes: MetadataRoute.Sitemap = dogs.map((dog) => ({
    url: `${siteUrl}/raser/${getDogSlug(dog)}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dogRoutes];
}
