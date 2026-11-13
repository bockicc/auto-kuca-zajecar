import type { Vehicle } from "@/types";

import { vehicles } from "./sources/vehicles";

export function getAllVehicles(): Vehicle[] {
  return vehicles;
}

export function getAvailableVehicles(): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.status !== "sold");
}

export function getFeaturedVehicles(limit = 3): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.featured && vehicle.status !== "sold").slice(0, limit);
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getVehicleSlugs(): string[] {
  return vehicles.map((vehicle) => vehicle.slug);
}

export function getSimilarVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  return vehicles
    .filter((candidate) => candidate.id !== vehicle.id && candidate.status !== "sold")
    .sort((a, b) => {
      const scoreA = Number(a.bodyType === vehicle.bodyType) + Number(a.fuel === vehicle.fuel);
      const scoreB = Number(b.bodyType === vehicle.bodyType) + Number(b.fuel === vehicle.fuel);

      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function getBrands(): string[] {
  return [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort((a, b) => a.localeCompare(b, "sr-Latn-RS"));
}

export function getLatestUpdateDate(): Date {
  const timestamps = vehicles.map((vehicle) => new Date(vehicle.listedAt).getTime());

  return new Date(Math.max(...timestamps));
}
