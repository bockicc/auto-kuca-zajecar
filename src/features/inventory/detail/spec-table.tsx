import { formatEngine, formatMileage, formatPower } from "@/lib/utils";
import type { Vehicle } from "@/types";
import {
  BODY_TYPE_LABELS,
  CONDITION_LABELS,
  DRIVE_LABELS,
  FUEL_LABELS,
  TRANSMISSION_LABELS,
} from "@/types";

interface SpecTableProps {
  vehicle: Vehicle;
}

export function SpecTable({ vehicle }: SpecTableProps) {
  const specs = [
    { label: "Godište", value: String(vehicle.year) },
    { label: "Kilometraža", value: formatMileage(vehicle.mileage) },
    { label: "Gorivo", value: FUEL_LABELS[vehicle.fuel] },
    { label: "Menjač", value: TRANSMISSION_LABELS[vehicle.transmission] },
    { label: "Karoserija", value: BODY_TYPE_LABELS[vehicle.bodyType] },
    { label: "Snaga", value: formatPower(vehicle.powerKw) },
    { label: "Motor", value: formatEngine(vehicle.engineCc) },
    { label: "Pogon", value: DRIVE_LABELS[vehicle.drive] },
    { label: "Broj vrata", value: String(vehicle.doors) },
    { label: "Broj sedišta", value: String(vehicle.seats) },
    { label: "Boja", value: vehicle.color },
    { label: "Stanje", value: CONDITION_LABELS[vehicle.condition] },
    ...(vehicle.vin ? [{ label: "VIN", value: vehicle.vin }] : []),
  ];

  return (
    <section aria-labelledby="specifications-heading">
      <h2 id="specifications-heading" className="text-xl font-semibold">
        Specifikacije
      </h2>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-0 rounded-lg border border-border sm:grid-cols-2">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
          >
            <dt className="text-sm text-muted-foreground">{spec.label}</dt>
            <dd className="text-right text-sm font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
