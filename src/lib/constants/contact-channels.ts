import type { ContactChannel, OpeningHours } from "@/types";

import { dealership } from "./dealership";

const whatsappNumber = dealership.phone.replace(/[^\d]/g, "");
const viberNumber = encodeURIComponent(dealership.phone.replace(/\s/g, ""));

const greeting = encodeURIComponent("Zdravo, zanima me ponuda vozila.");

export const contactChannels: ContactChannel[] = [
  {
    id: "phone",
    label: "Pozovite nas",
    value: dealership.phone,
    href: dealership.phoneHref,
  },
  {
    id: "viber",
    label: "Viber",
    value: dealership.phone,
    href: `viber://chat?number=${viberNumber}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: dealership.phone,
    href: `https://wa.me/${whatsappNumber}?text=${greeting}`,
  },
  {
    id: "email",
    label: "E-pošta",
    value: dealership.email,
    href: `mailto:${dealership.email}`,
  },
];

export const openingHours: OpeningHours[] = [
  { day: 1, open: "09:00", close: "18:00" },
  { day: 2, open: "09:00", close: "18:00" },
  { day: 3, open: "09:00", close: "18:00" },
  { day: 4, open: "09:00", close: "18:00" },
  { day: 5, open: "09:00", close: "18:00" },
  { day: 6, open: "09:00", close: "14:00" },
  { day: 0, open: "00:00", close: "00:00", closed: true },
];
