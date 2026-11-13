import type { ConsentState, StoredConsent } from "@/types";

export const CONSENT_STORAGE_KEY = "akz-consent";
export const CONSENT_VERSION = 1;

export const defaultConsent: ConsentState = {
  analytics: false,
  marketing: false,
  updatedAt: null,
};

export function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") return defaultConsent;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return defaultConsent;

    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.version !== CONSENT_VERSION) return defaultConsent;

    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : null,
    };
  } catch {
    return defaultConsent;
  }
}

export function writeStoredConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;

  const stored: StoredConsent = { ...consent, version: CONSENT_VERSION };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
}

export function hasAnalyticsConsent() {
  return readStoredConsent().analytics;
}
