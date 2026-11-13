import { BODY_TYPE_LABELS, FUEL_LABELS, TRANSMISSION_LABELS } from "@/types";
import type {
  BodyType,
  FilterOption,
  FuelType,
  Transmission,
  Vehicle,
  VehicleFacets,
  VehicleFilterState,
} from "@/types";
import { normalizeForSearch } from "@/lib/utils";

type FilterCategory = "brand" | "fuel" | "transmission" | "bodyType" | "price" | "year" | "mileage";

function matchesCategory(vehicle: Vehicle, filters: VehicleFilterState, category: FilterCategory) {
  switch (category) {
    case "brand":
      return filters.brand.length === 0 || filters.brand.includes(vehicle.brand);
    case "fuel":
      return filters.fuel.length === 0 || filters.fuel.includes(vehicle.fuel);
    case "transmission":
      return (
        filters.transmission.length === 0 || filters.transmission.includes(vehicle.transmission)
      );
    case "bodyType":
      return filters.bodyType.length === 0 || filters.bodyType.includes(vehicle.bodyType);
    case "price":
      return (
        (filters.minPrice === undefined || vehicle.price >= filters.minPrice) &&
        (filters.maxPrice === undefined || vehicle.price <= filters.maxPrice)
      );
    case "year":
      return (
        (filters.minYear === undefined || vehicle.year >= filters.minYear) &&
        (filters.maxYear === undefined || vehicle.year <= filters.maxYear)
      );
    case "mileage":
      return filters.maxMileage === undefined || vehicle.mileage <= filters.maxMileage;
  }
}

export function matchesFilters(
  vehicle: Vehicle,
  filters: VehicleFilterState,
  skip?: FilterCategory,
) {
  if (vehicle.status === "sold") return false;

  if (filters.q) {
    const haystack = normalizeForSearch(
      [vehicle.brand, vehicle.model, vehicle.variant, vehicle.year, vehicle.color]
        .filter(Boolean)
        .join(" "),
    );
    if (!haystack.includes(normalizeForSearch(filters.q))) return false;
  }

  const categories: FilterCategory[] = ["brand", "fuel", "transmission", "bodyType", "price", "year", "mileage"];

  return categories.every((category) => {
    if (category === skip) return true;
    return matchesCategory(vehicle, filters, category);
  });
}

export function filterVehicles(vehicles: Vehicle[], filters: VehicleFilterState) {
  return vehicles.filter((vehicle) => matchesFilters(vehicle, filters));
}

function countOptions<T extends string>(
  vehicles: Vehicle[],
  filters: VehicleFilterState,
  category: FilterCategory,
  values: Array<{ value: T; label: string }>,
): FilterOption<T>[] {
  return values.map(({ value, label }) => ({
    value,
    label,
    count: vehicles.filter(
      (vehicle) => matchesFilters(vehicle, filters, category) && String(vehicle[category as keyof Vehicle]) === value,
    ).length,
  }));
}

export function getFacets(vehicles: Vehicle[], filters: VehicleFilterState): VehicleFacets {
  const available = vehicles.filter((vehicle) => vehicle.status !== "sold");
  const brands = [...new Set(available.map((vehicle) => vehicle.brand))].sort((a, b) =>
    a.localeCompare(b, "sr-Latn-RS"),
  );
  const fuelValues = (Object.keys(FUEL_LABELS) as FuelType[]).map((value) => ({
    value,
    label: FUEL_LABELS[value],
  }));
  const transmissionValues = (Object.keys(TRANSMISSION_LABELS) as Transmission[]).map((value) => ({
    value,
    label: TRANSMISSION_LABELS[value],
  }));
  const bodyValues = (Object.keys(BODY_TYPE_LABELS) as BodyType[]).map((value) => ({
    value,
    label: BODY_TYPE_LABELS[value],
  }));
  const prices = available.map((vehicle) => vehicle.price);
  const years = available.map((vehicle) => vehicle.year);
  const mileages = available.map((vehicle) => vehicle.mileage);

  return {
    brands: countOptions(
      available,
      filters,
      "brand",
      brands.map((brand) => ({ value: brand, label: brand })),
    ),
    fuels: countOptions(available, filters, "fuel", fuelValues),
    transmissions: countOptions(available, filters, "transmission", transmissionValues),
    bodyTypes: countOptions(available, filters, "bodyType", bodyValues),
    priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
    yearRange: { min: Math.min(...years), max: Math.max(...years) },
    mileageRange: { min: Math.min(...mileages), max: Math.max(...mileages) },
  };
}
