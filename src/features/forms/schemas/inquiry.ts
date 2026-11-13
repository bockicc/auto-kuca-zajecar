import { z } from "zod";

import { consentSchema, phoneSchema, websiteSchema } from "./phone";

export const inquiryTopics = ["vehicle", "financing", "trade-in", "service", "other"] as const;

export const inquiryFormBaseSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Unesite ime i prezime.")
    .max(80, "Ime je predugacko."),
  phone: z.union([phoneSchema, z.literal("")]).optional(),
  email: z.union([z.string().trim().email("E-posta nije ispravna."), z.literal("")]).optional(),
  topic: z.enum(inquiryTopics),
  vehicleSlug: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Poruka mora imati najmanje 10 karaktera.")
    .max(1000, "Poruka je predugacka."),
  consent: consentSchema,
  website: websiteSchema,
});

export const inquiryFormSchema = inquiryFormBaseSchema.superRefine((data, context) => {
  if (!data.phone && !data.email) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Unesite telefon ili e-postu.",
    });
  }
});

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>;
