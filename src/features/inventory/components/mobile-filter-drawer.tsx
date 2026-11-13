import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileFilterDrawer({ open, onClose, children }: MobileFilterDrawerProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Filteri"
      description="Izaberite kriterijume za pretragu vozila."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Zatvori
          </Button>
          <Button onClick={onClose}>Prikaži rezultate</Button>
        </>
      }
    >
      {children}
    </Dialog>
  );
}
