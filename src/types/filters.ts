import type { BodyType, FuelType, Transmission } from "./vehicle";

export type VehicleSort = "newest" | "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

export const SORT_LABELS: Record<VehicleSort, string> = {
  newest: "Najnovije",
  "price-asc": "Cena: rastuće",
  "price-desc": "Cena: opadajuće",
  "year-desc": "Godište: najnovije",
  "mileage-asc": "Kilometraža: najmanja",
};

export interface VehicleFilterState {
  q?: string;
  brand: string[];
  fuel: FuelType[];
  transmission: Transmission[];
  bodyType: BodyType[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  sort: VehicleSort;
  page: number;
}

export interface VehicleSearchParams {
  q?: string;
  brand?: string;
  fuel?: string;
  transmission?: string;
  body?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  sort?: VehicleSort;
  page?: number;
}

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
  count: number;
}

export interface VehicleFacets {
  brands: FilterOption[];
  fuels: FilterOption<FuelType>[];
  transmissions: FilterOption<Transmission>[];
  bodyTypes: FilterOption<BodyType>[];
  priceRange: { min: number; max: number };
  yearRange: { min: number; max: number };
  mileageRange: { min: number; max: number };
}
