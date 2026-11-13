import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Fuel, Gauge, Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatMileage, formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/types";
import { FUEL_LABELS, STATUS_LABELS, TRANSMISSION_LABELS } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

const statusVariant = {
  available: "success",
  reserved: "warning",
  sold: "danger",
} as const;

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const title = `${vehicle.brand} ${vehicle.model}`;
  const isReduced = vehicle.previousPrice !== undefined && vehicle.previousPrice > vehicle.price;

  return (
    <Link
      to="/vozila/$slug"
      params={{ slug: vehicle.slug }}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      aria-label={`${title}, ${vehicle.year}, ${formatPrice(vehicle.price)}`}
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border-border/80 bg-surface transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:shadow-overlay">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
          <img
            src={vehicle.images[0]?.src ?? "/images/vehicles/volkswagen-golf-2019.jpg"}
            alt={vehicle.images[0]?.alt ?? title}
            width={800}
            height={600}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-black/15"
          />
          <div className="absolute inset-x-3 top-3 flex flex-wrap items-start gap-1.5">
            {vehicle.status !== "available" ? (
              <Badge
                variant={statusVariant[vehicle.status]}
                className="rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm backdrop-blur-md"
              >
                {STATUS_LABELS[vehicle.status]}
              </Badge>
            ) : null}
            {isReduced ? (
              <Badge className="rounded-sm border-transparent bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-contrast shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]">
                Sniženo
              </Badge>
            ) : null}
            {vehicle.featured ? (
              <Badge className="rounded-sm border-brand/30 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand backdrop-blur-md">
                Izdvojeno
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em]">
              {title}
              {vehicle.variant ? (
                <span className="mt-0.5 block text-[13px] font-normal leading-relaxed text-muted-foreground">
                  {vehicle.variant}
                </span>
              ) : null}
            </h3>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand/70" />
              {vehicle.color}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 border-y border-border/60 py-3 text-[13px] text-muted-foreground">
            <li className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-3.5 shrink-0 text-brand/70" />
              <span className="tabular">{vehicle.year}</span>
            </li>
            <li className="flex items-center gap-2">
              <Gauge aria-hidden="true" className="size-3.5 shrink-0 text-brand/70" />
              <span className="tabular">{formatMileage(vehicle.mileage)}</span>
            </li>
            <li className="flex items-center gap-2">
              <Fuel aria-hidden="true" className="size-3.5 shrink-0 text-brand/70" />
              {FUEL_LABELS[vehicle.fuel]}
            </li>
            <li className="flex items-center gap-2">
              <Settings2 aria-hidden="true" className="size-3.5 shrink-0 text-brand/70" />
              {TRANSMISSION_LABELS[vehicle.transmission]}
            </li>
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              {isReduced ? (
                <p className="text-[11px] font-medium text-muted-foreground line-through">
                  {formatPrice(vehicle.previousPrice ?? 0)}
                </p>
              ) : null}
              <p className="mt-0.5 text-[22px] font-bold leading-none text-price">
                {formatPrice(vehicle.price)}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
              Detalji
              <span className="flex size-7 items-center justify-center rounded-full border border-brand/25 bg-brand/10 transition-colors duration-200 group-hover:border-brand/50 group-hover:bg-brand/15">
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
