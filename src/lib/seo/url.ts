import { siteConfig } from "@/lib/constants";

export function withBasePath(path: string) {
  if (/^https?:\/\//.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!base || base === "/") return normalized;
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}

export function absoluteUrl(path = "/") {
  const site = siteConfig.url.replace(/\/+$/, "");
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const fullPath =
    !base || base === "/" || normalized.startsWith(`${base}/`) ? normalized : `${base}${normalized}`;
  const siteBase = base && base !== "/" && site.endsWith(base) ? site.slice(0, -base.length) : site;

  return `${siteBase}${fullPath}`;
}
