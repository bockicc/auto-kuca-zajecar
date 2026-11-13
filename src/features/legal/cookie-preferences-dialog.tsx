import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";

import { useConsent } from "./consent-provider";

export function CookiePreferencesDialog() {
  const { consent, isPreferencesOpen, closePreferences, savePreferences, acceptAll } = useConsent();
  const [analytics, setAnalytics] = React.useState(consent.analytics);
  const [marketing, setMarketing] = React.useState(consent.marketing);

  React.useEffect(() => {
    if (isPreferencesOpen) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [consent, isPreferencesOpen]);

  return (
    <Dialog
      open={isPreferencesOpen}
      onClose={closePreferences}
      title="Podešavanja kolačića"
      description="Izaberite koje kolačiće dozvoljavate. Neophodni kolačići su uvek aktivni."
      footer={
        <>
          <Button variant="ghost" onClick={acceptAll}>
            Prihvati sve
          </Button>
          <Button onClick={() => savePreferences({ analytics, marketing })}>Sačuvaj izbor</Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm font-semibold">Neophodni kolačići</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Omogućavaju osnovne funkcije sajta i ne mogu se isključiti.
          </p>
        </div>
        <Checkbox
          checked
          disabled
          label="Neophodni kolačići"
          description="Uvek aktivni."
        />
        <Checkbox
          checked={analytics}
          onChange={(event) => setAnalytics(event.target.checked)}
          label="Analitički kolačići"
          description="Pomažu nam da razumemo kako se sajt koristi. Podaci su anonimizovani."
        />
        <Checkbox
          checked={marketing}
          onChange={(event) => setMarketing(event.target.checked)}
          label="Marketinški kolačići"
          description="Koriste se za merenje kampanja i relevantnije oglašavanje."
        />
      </div>
    </Dialog>
  );
}
