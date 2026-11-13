import type { Vehicle, VehicleSort } from "@/types";

export function sortVehicles(vehicles: Vehicle[], sort: VehicleSort) {
  const sorted = [...vehicles];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return sorted.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
  }
}
