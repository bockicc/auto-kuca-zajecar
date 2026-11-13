import { z } from "zod";

import { isValidSerbianPhone } from "@/lib/utils";

export const phoneSchema = z
  .string()
  .trim()
  .min(6, "Unesite broj telefona.")
  .refine(isValidSerbianPhone, "Unesite ispravan broj telefona (npr. 060 123 4567).");

export const consentSchema = z
  .boolean()
  .refine((value) => value === true, "Morate prihvatiti obradu podataka.");

export const websiteSchema = z.string().max(0, "Neispravan zahtev.").optional();
