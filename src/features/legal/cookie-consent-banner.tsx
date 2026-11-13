import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useConsent } from "./consent-provider";

export function CookieConsentBanner() {
  const { isBannerVisible, acceptAll, rejectAll, openPreferences } = useConsent();

  if (!isBannerVisible) return null;

  return (
    <div
      data-cookie-banner
      role="region"
      aria-label="Podešavanja kolačića"
      className="fixed inset-x-0 bottom-0 z-cookie border-t border-border bg-surface p-4 shadow-overlay safe-bottom"
    >
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Cookie aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
          <p className="max-w-2xl text-sm text-muted-foreground">
            Koristimo neophodne kolačiće za rad sajta. Uz vašu saglasnost koristimo i
            analitičke kolačiće kako bismo poboljšali iskustvo.{" "}
            <a href="/politika-kolacica" className="font-medium text-brand underline">
              Politika kolačića
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={openPreferences}>
            Podesi
          </Button>
          <Button variant="outline" size="sm" onClick={rejectAll}>
            Odbij
          </Button>
          <Button size="sm" onClick={acceptAll}>
            Prihvati sve
          </Button>
        </div>
      </div>
    </div>
  );
}
