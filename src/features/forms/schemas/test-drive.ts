import { z } from "zod";

import { consentSchema, phoneSchema, websiteSchema } from "./phone";

export const testDriveFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Unesite ime i prezime.")
    .max(80, "Ime je predugačko."),
  phone: phoneSchema,
  email: z.union([z.string().trim().email("E-pošta nije ispravna."), z.literal("")]).optional(),
  preferredDate: z
    .string()
    .min(1, "Izaberite datum.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Datum nije ispravan."),
  preferredTime: z.string().min(1, "Izaberite vreme."),
  message: z.string().trim().max(1000, "Poruka je predugačka.").optional(),
  vehicleSlug: z.string().min(1, "Vozilo nije izabrano."),
  consent: consentSchema,
  website: websiteSchema,
});

export type TestDriveFormValues = z.infer<typeof testDriveFormSchema>;
