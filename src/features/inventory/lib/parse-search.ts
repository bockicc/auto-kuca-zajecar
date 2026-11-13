import type {
  BodyType,
  FuelType,
  Transmission,
  VehicleFilterState,
  VehicleSearchParams,
  VehicleSort,
} from "@/types";

export const VEHICLE_PAGE_SIZE = 12;

const SORTS: readonly VehicleSort[] = [
  "newest",
  "price-asc",
  "price-desc",
  "year-desc",
  "mileage-asc",
];

const FUELS: readonly FuelType[] = ["petrol", "diesel", "hybrid", "electric", "lpg"];
const TRANSMISSIONS: readonly Transmission[] = ["manual", "automatic"];
const BODY_TYPES: readonly BodyType[] = ["hatchback", "sedan", "suv", "wagon", "van", "coupe"];

export function isOneOf<T extends string>(value: string, allowed: readonly T[]): value is T {
  return (allowed as readonly string[]).includes(value);
}

function toNumber(value: unknown) {
  const parsed =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;

  return Number.isFinite(parsed) ? parsed : undefined;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function toList(value?: string) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toValidatedList<T extends string>(value: unknown, allowed: readonly T[]) {
  if (typeof value !== "string") return undefined;

  const valid = toList(value).filter((item): item is T => isOneOf(item, allowed));

  return valid.length > 0 ? valid.join(",") : undefined;
}

export function parseVehicleSearch(search: Record<string, unknown>): VehicleSearchParams {
  const q = typeof search.q === "string" ? search.q.slice(0, 100).trim() : undefined;
  const sort =
    typeof search.sort === "string" && isOneOf(search.sort, SORTS) ? search.sort : undefined;
  const page = clamp(toNumber(search.page) ?? 1, 1, 999);
  const minPrice = toNumber(search.minPrice);
  const maxPrice = toNumber(search.maxPrice);
  const minYear = toNumber(search.minYear);
  const maxYear = toNumber(search.maxYear);
  const maxMileage = toNumber(search.maxMileage);

  return {
    q: q || undefined,
    brand: typeof search.brand === "string" ? search.brand.slice(0, 200) : undefined,
    fuel: toValidatedList(search.fuel, FUELS),
    transmission: toValidatedList(search.transmission, TRANSMISSIONS),
    body: toValidatedList(search.body, BODY_TYPES),
    minPrice: minPrice !== undefined ? clamp(minPrice, 0, 10_000_000) : undefined,
    maxPrice: maxPrice !== undefined ? clamp(maxPrice, 0, 10_000_000) : undefined,
    minYear: minYear !== undefined ? clamp(minYear, 1950, 2100) : undefined,
    maxYear: maxYear !== undefined ? clamp(maxYear, 1950, 2100) : undefined,
    maxMileage: maxMileage !== undefined ? clamp(maxMileage, 0, 1_000_000) : undefined,
    sort,
    page: page > 1 ? page : undefined,
  };
}

export function toFilterState(params: VehicleSearchParams): VehicleFilterState {
  return {
    q: params.q?.trim() || undefined,
    brand: toList(params.brand),
    fuel: toList(params.fuel).filter((value): value is FuelType => isOneOf(value, FUELS)),
    transmission: toList(params.transmission).filter((value): value is Transmission =>
      isOneOf(value, TRANSMISSIONS),
    ),
    bodyType: toList(params.body).filter((value): value is BodyType => isOneOf(value, BODY_TYPES)),
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    minYear: params.minYear,
    maxYear: params.maxYear,
    maxMileage: params.maxMileage,
    sort: params.sort ?? "newest",
    page: params.page ?? 1,
  };
}

export function toSearchParams(filters: VehicleFilterState): VehicleSearchParams {
  return {
    q: filters.q || undefined,
    brand: filters.brand.length > 0 ? filters.brand.join(",") : undefined,
    fuel: filters.fuel.length > 0 ? filters.fuel.join(",") : undefined,
    transmission:
      filters.transmission.length > 0 ? filters.transmission.join(",") : undefined,
    body: filters.bodyType.length > 0 ? filters.bodyType.join(",") : undefined,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minYear: filters.minYear,
    maxYear: filters.maxYear,
    maxMileage: filters.maxMileage,
    sort: filters.sort !== "newest" ? filters.sort : undefined,
    page: filters.page > 1 ? filters.page : undefined,
  };
}
