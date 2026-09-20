import type { MetadataRoute } from "next";
import { SERVICE_LIST } from "@/config/services";
import { getStates, stateNameToSlug } from "@/lib/coverage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homeservicesfixing.shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
  ];

  for (const service of SERVICE_LIST) {
    entries.push({
      url: `${siteUrl}/${service.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const abbr of getStates(service.slug)) {
      entries.push({
        url: `${siteUrl}/${service.slug}/${stateNameToSlug(abbr)}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
