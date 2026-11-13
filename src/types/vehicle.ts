export type FuelType = "petrol" | "diesel" | "hybrid" | "electric" | "lpg";

export type Transmission = "manual" | "automatic";

export type BodyType = "hatchback" | "sedan" | "suv" | "wagon" | "van" | "coupe";

export type DriveType = "fwd" | "rwd" | "awd";

export type VehicleStatus = "available" | "reserved" | "sold";

export type VehicleCondition = "used" | "new";

export interface VehicleImage {
  src: string;
  alt: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  previousPrice?: number;
  mileage: number;
  fuel: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  powerKw: number;
  engineCc: number;
  color: string;
  drive: DriveType;
  doors: number;
  seats: number;
  condition: VehicleCondition;
  status: VehicleStatus;
  featured: boolean;
  features: string[];
  images: VehicleImage[];
  description: string;
  vin?: string;
  listedAt: string;
}

export const FUEL_LABELS: Record<FuelType, string> = {
  petrol: "Benzin",
  diesel: "Dizel",
  hybrid: "Hibrid",
  electric: "Električni",
  lpg: "LPG",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  manual: "Manuelni",
  automatic: "Automatski",
};

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  hatchback: "Hečbek",
  sedan: "Limuzina",
  suv: "SUV",
  wagon: "Karavan",
  van: "Monovolumen",
  coupe: "Kupe",
};

export const DRIVE_LABELS: Record<DriveType, string> = {
  fwd: "Prednji pogon",
  rwd: "Zadnji pogon",
  awd: "4x4",
};

export const STATUS_LABELS: Record<VehicleStatus, string> = {
  available: "Dostupno",
  reserved: "Rezervisano",
  sold: "Prodato",
};

export const CONDITION_LABELS: Record<VehicleCondition, string> = {
  used: "Polovno",
  new: "Novo",
};
