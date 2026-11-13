import { useNavigate, useSearch } from "@tanstack/react-router";
import * as React from "react";

import type { VehicleFilterState, VehicleSearchParams } from "@/types";

import { toFilterState } from "../lib/parse-search";

type ListKey = "brand" | "fuel" | "transmission" | "body";

export function useVehicleFilters() {
  const search = useSearch({ from: "/vozila/" });
  const navigate = useNavigate({ from: "/vozila/" });
  const filters = React.useMemo<VehicleFilterState>(() => toFilterState(search), [search]);

  const update = React.useCallback(
    (patch: Partial<VehicleSearchParams>) => {
      navigate({
        to: "/vozila",
        search: (previous) => {
          const next: VehicleSearchParams = { ...previous, ...patch };

          if (!("page" in patch)) next.page = undefined;

          return next;
        },
        replace: true,
        resetScroll: false,
      });
    },
    [navigate],
  );

  const toggleValue = React.useCallback(
    (key: ListKey, value: string) => {
      const current = search[key];
      const values = current ? current.split(",") : [];
      const next = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];
      const serialized = next.length > 0 ? next.join(",") : undefined;

      if (key === "brand") update({ brand: serialized });
      if (key === "fuel") update({ fuel: serialized });
      if (key === "transmission") update({ transmission: serialized });
      if (key === "body") update({ body: serialized });
    },
    [search, update],
  );

  const setQuery = React.useCallback((q: string) => update({ q: q.trim() || undefined }), [update]);
  const setSort = React.useCallback(
    (sort: VehicleFilterState["sort"]) => update({ sort: sort === "newest" ? undefined : sort }),
    [update],
  );
  const setPage = React.useCallback((page: number) => update({ page: page > 1 ? page : undefined }), [update]);

  const setPriceRange = React.useCallback(
    (range?: [number, number]) => update({ minPrice: range?.[0], maxPrice: range?.[1] }),
    [update],
  );
  const setYearRange = React.useCallback(
    (range?: [number, number]) => update({ minYear: range?.[0], maxYear: range?.[1] }),
    [update],
  );
  const setMaxMileage = React.useCallback(
    (value?: number) => update({ maxMileage: value }),
    [update],
  );

  const clearAll = React.useCallback(() => {
    navigate({ to: "/vozila", search: {}, replace: true, resetScroll: false });
  }, [navigate]);

  const removeFilter = React.useCallback(
    (key: "q" | ListKey | "price" | "year" | "mileage", value?: string) => {
      if (key === "q") return update({ q: undefined });
      if (key === "price") return update({ minPrice: undefined, maxPrice: undefined });
      if (key === "year") return update({ minYear: undefined, maxYear: undefined });
      if (key === "mileage") return update({ maxMileage: undefined });
      if (value) return toggleValue(key, value);
    },
    [toggleValue, update],
  );

  const hasActiveFilters =
    Boolean(filters.q) ||
    filters.brand.length > 0 ||
    filters.fuel.length > 0 ||
    filters.transmission.length > 0 ||
    filters.bodyType.length > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minYear !== undefined ||
    filters.maxYear !== undefined ||
    filters.maxMileage !== undefined;

  return {
    search,
    filters,
    hasActiveFilters,
    update,
    toggleValue,
    setQuery,
    setSort,
    setPage,
    setPriceRange,
    setYearRange,
    setMaxMileage,
    clearAll,
    removeFilter,
  };
}
