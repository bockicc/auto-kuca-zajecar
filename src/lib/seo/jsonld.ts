import type { Vehicle } from "@/types";

import { BODY_TYPE_LABELS, FUEL_LABELS, TRANSMISSION_LABELS } from "@/types";
import { fullAddress, dealership, openingHours, siteConfig } from "@/lib/constants";
import { absoluteUrl } from "./url";

type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue };

export function buildAutoDealerJsonLd(): Record<string, JsonLdValue> {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: dealership.legalName,
    url: siteConfig.url,
    telephone: dealership.phone,
    email: dealership.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: dealership.street,
      addressLocality: dealership.city,
      postalCode: dealership.postalCode,
      addressCountry: "RS",
    },
    areaServed: "Zaječar, Srbija",
    openingHoursSpecification: openingHours
      .filter((entry) => !entry.closed)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][entry.day],
        opens: entry.open,
        closes: entry.close,
      })),
  };
}

export function buildVehicleJsonLd(vehicle: Vehicle): Record<string, JsonLdValue> {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.variant ?? ""}`.trim(),
    url: absoluteUrl(`/vozila/${vehicle.slug}`),
    image: vehicle.images.map((image) => absoluteUrl(image.src)),
    description: vehicle.description,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    vehicleModelDate: vehicle.year,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: FUEL_LABELS[vehicle.fuel],
    vehicleTransmission: TRANSMISSION_LABELS[vehicle.transmission],
    bodyType: BODY_TYPE_LABELS[vehicle.bodyType],
    numberOfDoors: vehicle.doors,
    seatingCapacity: vehicle.seats,
    color: vehicle.color,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "EUR",
      availability:
        vehicle.status === "available"
          ? "https://schema.org/InStock"
          : vehicle.status === "reserved"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/SoldOut",
      seller: { "@type": "AutoDealer", name: dealership.legalName },
    },
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function buildFaqJsonLd(entries: FaqEntry[]): Record<string, JsonLdValue> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, JsonLdValue> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export { fullAddress };
