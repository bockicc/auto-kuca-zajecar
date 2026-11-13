import * as React from "react";

import { getAllVehicles } from "@/lib/data";
import { normalizeForSearch } from "@/lib/utils";
import type { Vehicle } from "@/types";

export function useSearch(initialQuery = "") {
  const [query, setQuery] = React.useState(initialQuery);
  const results = React.useMemo<Vehicle[]>(() => {
    const normalized = normalizeForSearch(query);

    if (!normalized) return [];

    return getAllVehicles()
      .filter((vehicle) => vehicle.status !== "sold")
      .filter((vehicle) => {
        const haystack = normalizeForSearch(
          [vehicle.brand, vehicle.model, vehicle.variant, vehicle.year, vehicle.color]
            .filter(Boolean)
            .join(" "),
        );

        return haystack.includes(normalized);
      })
      .slice(0, 6);
  }, [query]);

  return { query, setQuery, results };
}
