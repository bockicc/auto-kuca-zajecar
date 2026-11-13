import { siteConfig } from "@/lib/constants";

import { absoluteUrl } from "./url";

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export interface SeoResult {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  noIndex: boolean;
}

export function buildSeo({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = "website",
  noIndex = false,
}: SeoInput): SeoResult {
  return {
    title,
    description,
    canonical: absoluteUrl(path),
    image: absoluteUrl(image),
    type,
    noIndex,
  };
}

export type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export function toMetaTags(seo: SeoResult): MetaTag[] {
  const tags: MetaTag[] = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: seo.type },
    { property: "og:url", content: seo.canonical },
    { property: "og:image", content: seo.image },
    { property: "og:locale", content: siteConfig.locale },
    { property: "og:site_name", content: siteConfig.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.image },
  ];

  if (seo.noIndex) {
    tags.push({ name: "robots", content: "noindex, nofollow" });
  }

  return tags;
}
