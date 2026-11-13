import { X } from "lucide-react";

import { formatMileage, formatNumber, formatPrice } from "@/lib/utils";
import type { VehicleFilterState } from "@/types";
import { BODY_TYPE_LABELS, FUEL_LABELS, TRANSMISSION_LABELS } from "@/types";

type FilterKey = "q" | "brand" | "fuel" | "transmission" | "body" | "price" | "year" | "mileage";

interface ActiveFilterChipsProps {
  filters: VehicleFilterState;
  onRemove: (key: FilterKey, value?: string) => void;
  onClearAll: () => void;
}

interface Chip {
  key: string;
  label: string;
  remove: () => void;
}

export function ActiveFilterChips({ filters, onRemove, onClearAll }: ActiveFilterChipsProps) {
  const chips: Chip[] = [];

  if (filters.q) {
    chips.push({ key: "q", label: `Pretraga: „${filters.q}”`, remove: () => onRemove("q") });
  }

  for (const brand of filters.brand) {
    chips.push({ key: `brand-${brand}`, label: brand, remove: () => onRemove("brand", brand) });
  }
  for (const fuel of filters.fuel) {
    chips.push({
      key: `fuel-${fuel}`,
      label: FUEL_LABELS[fuel],
      remove: () => onRemove("fuel", fuel),
    });
  }
  for (const transmission of filters.transmission) {
    chips.push({
      key: `transmission-${transmission}`,
      label: TRANSMISSION_LABELS[transmission],
      remove: () => onRemove("transmission", transmission),
    });
  }
  for (const body of filters.bodyType) {
    chips.push({
      key: `body-${body}`,
      label: BODY_TYPE_LABELS[body],
      remove: () => onRemove("body", body),
    });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const label =
      filters.minPrice !== undefined && filters.maxPrice !== undefined
        ? `Cena: ${formatPrice(filters.minPrice)}–${formatPrice(filters.maxPrice)}`
        : filters.maxPrice !== undefined
          ? `Cena do ${formatPrice(filters.maxPrice)}`
          : `Cena od ${formatPrice(filters.minPrice ?? 0)}`;
    chips.push({ key: "price", label, remove: () => onRemove("price") });
  }

  if (filters.minYear !== undefined || filters.maxYear !== undefined) {
    const label =
      filters.minYear !== undefined && filters.maxYear !== undefined
        ? `Godište: ${filters.minYear}–${filters.maxYear}`
        : filters.maxYear !== undefined
          ? `Godište do ${filters.maxYear}`
          : `Godište od ${filters.minYear ?? ""}`;
    chips.push({ key: "year", label, remove: () => onRemove("year") });
  }

  if (filters.maxMileage !== undefined) {
    chips.push({
      key: "mileage",
      label: `Kilometraža do ${formatMileage(filters.maxMileage)}`,
      remove: () => onRemove("mileage"),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Aktivni filteri">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.remove}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium transition-colors hover:border-brand/40 hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {chip.label}
          <X aria-hidden="true" className="size-3.5" />
          <span className="sr-only">Ukloni filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="rounded-sm px-2 py-1 text-xs font-semibold text-brand underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Obriši sve ({formatNumber(chips.length)})
      </button>
    </div>
  );
}
