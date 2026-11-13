import { describe, expect, it } from "vitest";

import type { Vehicle } from "@/types";

import {
  VEHICLE_PAGE_SIZE,
  filterVehicles,
  getFacets,
  paginate,
  parseVehicleSearch,
  sortVehicles,
  toFilterState,
} from "../lib";

function makeVehicle(overrides: Partial<Vehicle> & Pick<Vehicle, "id" | "slug" | "price">): Vehicle {
  const { id, slug, price, ...rest } = overrides;

  return {
    id,
    slug,
    price,
    brand: "Volkswagen",
    model: "Golf",
    year: 2020,
    mileage: 50_000,
    fuel: "diesel",
    transmission: "manual",
    bodyType: "hatchback",
    powerKw: 110,
    engineCc: 1968,
    color: "Siva",
    drive: "fwd",
    doors: 5,
    seats: 5,
    condition: "used",
    status: "available",
    featured: false,
    features: ["Klima"],
    images: [{ src: "/images/vehicles/exterior.svg", alt: "Vozilo" }],
    description: "Test vozilo.",
    listedAt: "2026-01-01",
    ...rest,
  };
}

const vehicles = [
  makeVehicle({ id: "1", slug: "golf-1", price: 15_000, brand: "Volkswagen", fuel: "diesel" }),
  makeVehicle({
    id: "2",
    slug: "golf-2",
    price: 20_000,
    brand: "Volkswagen",
    fuel: "petrol",
    bodyType: "sedan",
  }),
  makeVehicle({ id: "3", slug: "toyota-1", price: 25_000, brand: "Toyota", mileage: 20_000 }),
  makeVehicle({ id: "4", slug: "sold-1", price: 10_000, status: "sold" }),
];

describe("parseVehicleSearch", () => {
  it("normalizes valid values", () => {
    const parsed = parseVehicleSearch({
      q: "  golf  ",
      brand: "Volkswagen",
      fuel: "diesel,invalid",
      body: "suv",
      page: "2",
      sort: "price-asc",
      maxPrice: "30000",
    });

    expect(parsed.q).toBe("golf");
    expect(parsed.fuel).toBe("diesel");
    expect(parsed.body).toBe("suv");
    expect(parsed.page).toBe(2);
    expect(parsed.sort).toBe("price-asc");
    expect(parsed.maxPrice).toBe(30_000);
  });

  it("drops invalid values and clamps ranges", () => {
    const parsed = parseVehicleSearch({
      fuel: "invalid",
      sort: "unknown",
      page: "0",
      minPrice: "-5",
      minYear: "1900",
      maxMileage: "5000000",
    });

    expect(parsed.fuel).toBeUndefined();
    expect(parsed.sort).toBeUndefined();
    expect(parsed.page).toBeUndefined();
    expect(parsed.minPrice).toBe(0);
    expect(parsed.minYear).toBe(1950);
    expect(parsed.maxMileage).toBe(1_000_000);
  });
});

describe("filterVehicles", () => {
  it("filters by brand and fuel and excludes sold vehicles", () => {
    const filters = toFilterState({ brand: "Volkswagen", fuel: "petrol" });
    const result = filterVehicles(vehicles, filters);

    expect(result.map((vehicle) => vehicle.id)).toEqual(["2"]);
  });

  it("matches text search case-insensitively", () => {
    const filters = toFilterState({ q: "TOYOTA" });

    expect(filterVehicles(vehicles, filters).map((vehicle) => vehicle.id)).toEqual(["3"]);
  });
});

describe("sortVehicles", () => {
  it("sorts by price ascending without mutating the input", () => {
    const original = [...vehicles];
    const sorted = sortVehicles(vehicles, "price-asc");

    expect(sorted.map((vehicle) => vehicle.price)).toEqual([10_000, 15_000, 20_000, 25_000]);
    expect(vehicles).toEqual(original);
  });

  it("sorts by mileage ascending", () => {
    const sorted = sortVehicles(vehicles, "mileage-asc");

    expect(sorted[0]?.mileage).toBe(20_000);
  });
});

describe("paginate", () => {
  it("returns the requested page and clamps out-of-range pages", () => {
    const items = Array.from({ length: VEHICLE_PAGE_SIZE + 3 }, (_, index) => index);

    const first = paginate(items, 1, VEHICLE_PAGE_SIZE);
    const second = paginate(items, 2, VEHICLE_PAGE_SIZE);
    const beyond = paginate(items, 99, VEHICLE_PAGE_SIZE);

    expect(first.items).toHaveLength(VEHICLE_PAGE_SIZE);
    expect(second.items).toHaveLength(3);
    expect(beyond.page).toBe(2);
    expect(second.totalPages).toBe(2);
    expect(second.total).toBe(VEHICLE_PAGE_SIZE + 3);
  });
});

describe("getFacets", () => {
  it("builds ranges and option counts from available vehicles", () => {
    const facets = getFacets(vehicles, toFilterState({}));

    expect(facets.priceRange).toEqual({ min: 15_000, max: 25_000 });
    expect(facets.mileageRange).toEqual({ min: 20_000, max: 50_000 });
    expect(facets.brands.find((brand) => brand.value === "Volkswagen")?.count).toBe(2);
    expect(facets.brands.find((brand) => brand.value === "Toyota")?.count).toBe(1);
  });
});
