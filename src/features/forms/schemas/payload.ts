import { z } from "zod";

import { inquiryFormBaseSchema } from "./inquiry";
import { testDriveFormSchema } from "./test-drive";

export const formMetaSchema = z.object({
  sourcePage: z.string().max(200),
  submittedAt: z.string(),
  utm: z.record(z.string()).optional(),
  website: z.string().max(0).optional(),
});

export const testDrivePayloadSchema = testDriveFormSchema
  .omit({ website: true })
  .extend({ kind: z.literal("test-drive"), meta: formMetaSchema });

export const inquiryPayloadSchema = inquiryFormBaseSchema
  .omit({ website: true })
  .extend({ kind: z.literal("inquiry"), meta: formMetaSchema });

export const formPayloadSchema = z.discriminatedUnion("kind", [
  testDrivePayloadSchema,
  inquiryPayloadSchema,
]);
