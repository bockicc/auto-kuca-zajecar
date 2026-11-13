import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import * as React from "react";

import { Breadcrumbs } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ActiveFilterChips,
  EmptyState,
  FilterPanel,
  MobileFilterDrawer,
  Pagination,
  ResultsSummary,
  SortControl,
  VehicleGrid,
  filterVehicles,
  getFacets,
  paginate,
  parseVehicleSearch,
  sortVehicles,
  useVehicleFilters,
  VEHICLE_PAGE_SIZE,
} from "@/features/inventory";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { getAllVehicles } from "@/lib/data";
import { buildBreadcrumbJsonLd, buildSeo, JsonLd, toMetaTags } from "@/lib/seo";
import type { BodyType, FuelType, Transmission } from "@/types";

export const Route = createFileRoute("/vozila/")({
  component: InventoryPage,
  validateSearch: (search: Record<string, unknown>) => parseVehicleSearch(search),
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "Ponuda vozila | Auto kuća Zaječar",
          description:
            "Pregledajte proverena polovna i nova vozila u Zaječaru. Filtrirajte po marki, ceni, godištu, gorivu i kilometraži.",
          path: "/vozila",
        }),
      ),
    }),
});

function InventoryPage() {
  const {
    filters,
    hasActiveFilters,
    toggleValue,
    setQuery,
    setSort,
    setPage,
    setPriceRange,
    setYearRange,
    setMaxMileage,
    clearAll,
    removeFilter,
  } = useVehicleFilters();
  const [isFilterOpen, setFilterOpen] = React.useState(false);
  const [queryDraft, setQueryDraft] = React.useState(filters.q ?? "");
  const debouncedQuery = useDebouncedValue(queryDraft, 300);
  const allVehicles = getAllVehicles();

  const facets = React.useMemo(() => getFacets(allVehicles, filters), [allVehicles, filters]);
  const results = React.useMemo(() => {
    const filtered = filterVehicles(allVehicles, filters);
    return sortVehicles(filtered, filters.sort);
  }, [allVehicles, filters]);
  const pageData = paginate(results, filters.page, VEHICLE_PAGE_SIZE);

  React.useEffect(() => {
    if (debouncedQuery.trim() !== (filters.q ?? "")) {
      setQuery(debouncedQuery);
    }
  }, [debouncedQuery, filters.q, setQuery]);

  React.useEffect(() => {
    if (!filters.q && queryDraft) {
      setQueryDraft("");
    }
  }, [filters.q, queryDraft]);

  const filterPanelProps = {
    facets,
    filters,
    onToggleBrand: (value: string) => toggleValue("brand", value),
    onToggleFuel: (value: FuelType) => toggleValue("fuel", value),
    onToggleTransmission: (value: Transmission) => toggleValue("transmission", value),
    onToggleBody: (value: BodyType) => toggleValue("body", value),
    onPriceChange: setPriceRange,
    onYearChange: setYearRange,
    onMileageChange: setMaxMileage,
    onClearAll: clearAll,
  };

  function changePage(page: number) {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container-page py-8">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Početna", path: "/" },
          { name: "Vozila", path: "/vozila" },
        ])}
      />
      <Breadcrumbs items={[{ label: "Početna", to: "/" }, { label: "Vozila" }]} />

      <div className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ponuda vozila</h1>
        <p className="mt-2 text-muted-foreground">
          Proverena vozila sa jasnom istorijom. Koristite filtere da pronađete model koji vam
          odgovara, a probnu vožnju možete zakazati u svakom trenutku.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block" aria-label="Filteri vozila">
          <div className="sticky top-24 rounded-lg border border-border bg-surface p-5">
            <FilterPanel {...filterPanelProps} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                value={queryDraft}
                onChange={(event) => setQueryDraft(event.target.value)}
                placeholder="Pretraži marku ili model…"
                aria-label="Pretraga vozila"
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal aria-hidden="true" />
                Filteri
                {hasActiveFilters ? (
                  <span className="ml-1 rounded-full bg-accent px-1.5 text-xs text-accent-contrast">
                    !
                  </span>
                ) : null}
              </Button>
              <SortControl value={filters.sort} onChange={setSort} />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <ActiveFilterChips filters={filters} onRemove={removeFilter} onClearAll={clearAll} />
            <ResultsSummary total={pageData.total} page={pageData.page} pageSize={VEHICLE_PAGE_SIZE} />
          </div>

          <div className="mt-5">
            {pageData.items.length > 0 ? (
              <VehicleGrid vehicles={pageData.items} />
            ) : (
              <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearAll} />
            )}
          </div>

          <div className="mt-8">
            <Pagination
              page={pageData.page}
              totalPages={pageData.totalPages}
              onPageChange={changePage}
            />
          </div>
        </div>
      </div>

      <MobileFilterDrawer open={isFilterOpen} onClose={() => setFilterOpen(false)}>
        <FilterPanel {...filterPanelProps} />
      </MobileFilterDrawer>
    </div>
  );
}
