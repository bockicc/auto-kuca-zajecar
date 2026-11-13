import { hasAnalyticsConsent } from "./consent";

const UTM_STORAGE_KEY = "akz-utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtm(search: string) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return {};

  const params = new URLSearchParams(search);
  const captured: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }

  if (Object.keys(captured).length > 0) {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
  }

  return captured;
}

export function getStoredUtm(): UtmParams {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return {};

  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function clearUtm() {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(UTM_STORAGE_KEY);
}
