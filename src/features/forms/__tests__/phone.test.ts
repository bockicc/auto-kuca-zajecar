import { describe, expect, it } from "vitest";

import { phoneSchema } from "../schemas/phone";

describe("phoneSchema", () => {
  it("accepts a valid phone number", () => {
    expect(phoneSchema.safeParse("+381 60 123 4567").success).toBe(true);
  });

  it("rejects an empty phone number", () => {
    expect(phoneSchema.safeParse("").success).toBe(false);
  });
});
