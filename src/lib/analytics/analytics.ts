import { hasAnalyticsConsent } from "./consent";

export function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  window.dispatchEvent(
    new CustomEvent("akz:analytics", {
      detail: { name, payload, timestamp: Date.now() },
    }),
  );

  if (import.meta.env.DEV) {
    console.debug("[analytics]", name, payload);
  }
}

export function trackConversion(name: string, payload: Record<string, unknown> = {}) {
  trackEvent(`conversion:${name}`, payload);
}
