import * as React from "react";

import {
  captureUtm,
  defaultConsent,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/analytics";
import type { ConsentState } from "@/types";

interface ConsentContextValue {
  consent: ConsentState;
  isBannerVisible: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: Pick<ConsentState, "analytics" | "marketing">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = React.createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = React.useState<ConsentState>(defaultConsent);
  const [hydrated, setHydrated] = React.useState(false);
  const [isPreferencesOpen, setPreferencesOpen] = React.useState(false);

  React.useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const persist = React.useCallback((next: ConsentState) => {
    writeStoredConsent(next);
    setConsent(next);

    if (next.analytics && typeof window !== "undefined") {
      captureUtm(window.location.search);
    }
  }, []);

  const acceptAll = React.useCallback(() => {
    persist({ analytics: true, marketing: true, updatedAt: new Date().toISOString() });
    setPreferencesOpen(false);
  }, [persist]);

  const rejectAll = React.useCallback(() => {
    persist({ analytics: false, marketing: false, updatedAt: new Date().toISOString() });
    setPreferencesOpen(false);
  }, [persist]);

  const savePreferences = React.useCallback<ConsentContextValue["savePreferences"]>(
    (preferences) => {
      persist({ ...preferences, updatedAt: new Date().toISOString() });
      setPreferencesOpen(false);
    },
    [persist],
  );

  const value = React.useMemo<ConsentContextValue>(
    () => ({
      consent,
      isBannerVisible: hydrated && consent.updatedAt === null,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, hydrated, isPreferencesOpen, acceptAll, rejectAll, savePreferences],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = React.useContext(ConsentContext);
  if (!context) throw new Error("useConsent mora biti unutar ConsentProvider.");

  return context;
}
