import { createServerFn } from "@tanstack/react-start";

import type { SubmissionResult } from "@/types";

import { formPayloadSchema } from "../schemas/payload";

export const submitForm = createServerFn({ method: "POST" })
  .validator((input: unknown) => formPayloadSchema.parse(input))
  .handler(async ({ data }): Promise<SubmissionResult> => {
    if (data.meta.website) {
      throw new Error("Neispravan zahtev.");
    }

    return {
      ok: true,
      reference: `AKZ-${Date.now().toString(36).toUpperCase()}`,
      receivedAt: new Date().toISOString(),
    };
  });
