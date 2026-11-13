import { siteConfig } from "@/lib/constants";

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/+$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalized}`;
}
