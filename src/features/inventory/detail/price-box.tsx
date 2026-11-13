import { CalendarCheck, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUiState } from "@/features/ui-state";
import { dealership } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/types";
import { STATUS_LABELS } from "@/types";

interface PriceBoxProps {
  vehicle: Vehicle;
}

const statusVariant = {
  available: "success",
  reserved: "warning",
  sold: "danger",
} as const;

export function PriceBox({ vehicle }: PriceBoxProps) {
  const { openTestDrive, openInquiry } = useUiState();
  const isReduced = vehicle.previousPrice !== undefined && vehicle.previousPrice > vehicle.price;
  const isSold = vehicle.status === "sold";

  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-card lg:sticky lg:top-24">
      <Badge variant={statusVariant[vehicle.status]}>{STATUS_LABELS[vehicle.status]}</Badge>

      <div className="mt-4">
        {isReduced ? (
          <p className="text-sm text-muted-foreground line-through">
            {formatPrice(vehicle.previousPrice ?? 0)}
          </p>
        ) : null}
        <p className="text-3xl font-bold text-price">{formatPrice(vehicle.price)}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Cena sa uračunatim porezom. Moguća zamena i finansiranje.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <Button
          className="w-full"
          onClick={() => openTestDrive(vehicle)}
          disabled={isSold}
        >
          <CalendarCheck aria-hidden="true" />
          Zakažite probnu vožnju
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => openInquiry(vehicle)}
        >
          Pošaljite upit
        </Button>
        <a
          href={`tel:${dealership.phone.replace(/\s/g, "")}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Phone aria-hidden="true" className="size-4" />
          {dealership.phone}
        </a>
      </div>
    </div>
  );
}
