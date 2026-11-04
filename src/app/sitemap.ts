import type { MetadataRoute } from "next";
import { LOCALES, servicePaths } from "@/content/services";
import { SITE_URL } from "@/content/site";

const serviceLanguages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${servicePaths[l]}`]));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...LOCALES.map((locale) => ({
      url: `${SITE_URL}${servicePaths[locale]}`,
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.9 : 0.8,
      alternates: { languages: serviceLanguages },
    })),
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
