import { Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/ui/slider";
import { Select } from "@/components/ui/select";
import { formatMileage, formatNumber, formatPrice } from "@/lib/utils";
import type { BodyType, FuelType, Transmission, VehicleFacets, VehicleFilterState } from "@/types";
import { BODY_TYPE_LABELS, FUEL_LABELS, TRANSMISSION_LABELS } from "@/types";

interface FilterPanelProps {
  facets: VehicleFacets;
  filters: VehicleFilterState;
  onToggleBrand: (value: string) => void;
  onToggleFuel: (value: FuelType) => void;
  onToggleTransmission: (value: Transmission) => void;
  onToggleBody: (value: BodyType) => void;
  onPriceChange: (range?: [number, number]) => void;
  onYearChange: (range?: [number, number]) => void;
  onMileageChange: (value?: number) => void;
  onClearAll: () => void;
}

export function FilterPanel({
  facets,
  filters,
  onToggleBrand,
  onToggleFuel,
  onToggleTransmission,
  onToggleBody,
  onPriceChange,
  onYearChange,
  onMileageChange,
  onClearAll,
}: FilterPanelProps) {
  const [brandQuery, setBrandQuery] = React.useState("");
  const [priceDraft, setPriceDraft] = React.useState<[number, number]>([
    filters.minPrice ?? facets.priceRange.min,
    filters.maxPrice ?? facets.priceRange.max,
  ]);
  const [mileageDraft, setMileageDraft] = React.useState(
    filters.maxMileage ?? facets.mileageRange.max,
  );
  const priceTimer = React.useRef<number | undefined>(undefined);
  const mileageTimer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    setPriceDraft([
      filters.minPrice ?? facets.priceRange.min,
      filters.maxPrice ?? facets.priceRange.max,
    ]);
  }, [filters.minPrice, filters.maxPrice, facets.priceRange.min, facets.priceRange.max]);

  React.useEffect(() => {
    setMileageDraft(filters.maxMileage ?? facets.mileageRange.max);
  }, [filters.maxMileage, facets.mileageRange.max]);

  React.useEffect(
    () => () => {
      window.clearTimeout(priceTimer.current);
      window.clearTimeout(mileageTimer.current);
    },
    [],
  );

  const commitPrice = React.useCallback(
    (range: [number, number]) => {
      const low = Math.max(facets.priceRange.min, Math.min(range[0], range[1]));
      const high = Math.min(facets.priceRange.max, Math.max(range[0], range[1]));
      const isFullRange = low <= facets.priceRange.min && high >= facets.priceRange.max;

      onPriceChange(isFullRange ? undefined : [low, high]);
    },
    [facets.priceRange.min, facets.priceRange.max, onPriceChange],
  );

  const handlePriceDraft = (range: [number, number]) => {
    setPriceDraft(range);
    window.clearTimeout(priceTimer.current);
    priceTimer.current = window.setTimeout(() => commitPrice(range), 300);
  };

  const handleMileageDraft = (value: number) => {
    setMileageDraft(value);
    window.clearTimeout(mileageTimer.current);
    mileageTimer.current = window.setTimeout(() => {
      onMileageChange(value >= facets.mileageRange.max ? undefined : value);
    }, 300);
  };

  const commitYear = (range: [number, number]) => {
    const isFullRange = range[0] <= facets.yearRange.min && range[1] >= facets.yearRange.max;

    onYearChange(isFullRange ? undefined : range);
  };

  const yearOptions = Array.from(
    { length: facets.yearRange.max - facets.yearRange.min + 1 },
    (_, index) => facets.yearRange.max - index,
  );
  const selectedMinYear = filters.minYear ?? facets.yearRange.min;
  const selectedMaxYear = filters.maxYear ?? facets.yearRange.max;
  const filteredBrands = facets.brands.filter((option) =>
    option.label.toLocaleLowerCase("sr").includes(brandQuery.toLocaleLowerCase("sr")),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Filteri</h2>
        <Button variant="link" size="sm" onClick={onClearAll} className="h-auto px-0">
          Obriši sve
        </Button>
      </div>

      <section className="space-y-3" aria-labelledby="filter-brand-heading">
        <h3 id="filter-brand-heading" className="text-sm font-semibold uppercase tracking-wide">
          Marka
        </h3>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={brandQuery}
            onChange={(event) => setBrandQuery(event.target.value)}
            placeholder="Pretraži marku"
            aria-label="Pretraži marku"
            className="h-10 pl-9 text-sm"
          />
        </div>
        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {filteredBrands.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nema pronađenih marki.</p>
          ) : (
            filteredBrands.map((option) => {
              const checked = filters.brand.includes(option.value);
              return (
                <Checkbox
                  key={option.value}
                  checked={checked}
                  disabled={option.count === 0 && !checked}
                  onChange={() => onToggleBrand(option.value)}
                  label={
                    <span className="flex w-full items-center justify-between gap-2">
                      <span>{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatNumber(option.count)}
                      </span>
                    </span>
                  }
                />
              );
            })
          )}
        </div>
      </section>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wide">Gorivo</legend>
        {facets.fuels.map((option) => {
          const checked = filters.fuel.includes(option.value);
          return (
            <Checkbox
              key={option.value}
              checked={checked}
              disabled={option.count === 0 && !checked}
              onChange={() => onToggleFuel(option.value)}
              label={
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{FUEL_LABELS[option.value]}</span>
                  <span className="text-xs text-muted-foreground">{formatNumber(option.count)}</span>
                </span>
              }
            />
          );
        })}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wide">Menjač</legend>
        {facets.transmissions.map((option) => {
          const checked = filters.transmission.includes(option.value);
          return (
            <Checkbox
              key={option.value}
              checked={checked}
              disabled={option.count === 0 && !checked}
              onChange={() => onToggleTransmission(option.value)}
              label={
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{TRANSMISSION_LABELS[option.value]}</span>
                  <span className="text-xs text-muted-foreground">{formatNumber(option.count)}</span>
                </span>
              }
            />
          );
        })}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wide">Karoserija</legend>
        {facets.bodyTypes.map((option) => {
          const checked = filters.bodyType.includes(option.value);
          return (
            <Checkbox
              key={option.value}
              checked={checked}
              disabled={option.count === 0 && !checked}
              onChange={() => onToggleBody(option.value)}
              label={
                <span className="flex w-full items-center justify-between gap-2">
                  <span>{BODY_TYPE_LABELS[option.value]}</span>
                  <span className="text-xs text-muted-foreground">{formatNumber(option.count)}</span>
                </span>
              }
            />
          );
        })}
      </fieldset>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide">Cena</h3>
        <RangeSlider
          min={facets.priceRange.min}
          max={facets.priceRange.max}
          step={500}
          value={priceDraft}
          onChange={handlePriceDraft}
          label="Cena"
          formatValue={formatPrice}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={facets.priceRange.min}
            max={priceDraft[1]}
            step={500}
            value={priceDraft[0]}
            aria-label="Cena od"
            className="h-10 text-sm"
            onChange={(event) =>
              setPriceDraft([Number(event.target.value) || 0, priceDraft[1]])
            }
            onBlur={() => commitPrice(priceDraft)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
          />
          <Input
            type="number"
            inputMode="numeric"
            min={priceDraft[0]}
            max={facets.priceRange.max}
            step={500}
            value={priceDraft[1]}
            aria-label="Cena do"
            className="h-10 text-sm"
            onChange={(event) =>
              setPriceDraft([priceDraft[0], Number(event.target.value) || 0])
            }
            onBlur={() => commitPrice(priceDraft)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide">Godište</h3>
        <div className="grid grid-cols-2 gap-2">
          <Select
            value={selectedMinYear}
            aria-label="Godište od"
            className="h-10 text-sm"
            onChange={(event) => commitYear([Number(event.target.value), selectedMaxYear])}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select
            value={selectedMaxYear}
            aria-label="Godište do"
            className="h-10 text-sm"
            onChange={(event) => commitYear([selectedMinYear, Number(event.target.value)])}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
      </section>

      <section className="space-y-3">
        <label htmlFor="filter-mileage" className="text-sm font-semibold uppercase tracking-wide">
          Maksimalna kilometraža
        </label>
        <p className="text-sm text-muted-foreground tabular">{formatMileage(mileageDraft)}</p>
        <input
          id="filter-mileage"
          type="range"
          min={0}
          max={facets.mileageRange.max}
          step={5000}
          value={mileageDraft}
          onChange={(event) => handleMileageDraft(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-elevated accent-[var(--accent)]"
        />
      </section>
    </div>
  );
}
