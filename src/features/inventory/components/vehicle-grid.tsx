import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import type { Vehicle } from "@/types";

import { VehicleCard } from "./vehicle-card";

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading?: boolean;
}

export function VehicleCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-xl border-border/80">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 border-y border-border/60 py-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-end justify-between gap-3">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
    </Card>
  );
}

export function VehicleGrid({ vehicles, isLoading = false }: VehicleGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy={isLoading || undefined}
    >
      {isLoading
        ? Array.from({ length: 6 }, (_, index) => <VehicleCardSkeleton key={index} />)
        : vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 4} />
          ))}
    </div>
  );
}
