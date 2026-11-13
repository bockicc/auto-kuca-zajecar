import { describe, expect, it } from "vitest";

import { inquiryFormSchema } from "../schemas/inquiry";
import { formPayloadSchema, inquiryPayloadSchema } from "../schemas/payload";

const validInquiry = {
  fullName: "Petar Petrović",
  phone: "0601234567",
  email: "",
  topic: "vehicle",
  vehicleSlug: "golf-1",
  message: "Zanima me ovo vozilo i mogućnost probne vožnje.",
  consent: true,
};

const meta = {
  sourcePage: "/vozila/golf-1",
  submittedAt: new Date().toISOString(),
};

describe("inquiryFormSchema", () => {
  it("accepts an inquiry with a phone number", () => {
    expect(inquiryFormSchema.safeParse(validInquiry).success).toBe(true);
  });

  it("accepts an inquiry with only an email", () => {
    const result = inquiryFormSchema.safeParse({
      ...validInquiry,
      phone: "",
      email: "petar@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an inquiry without phone and email", () => {
    const result = inquiryFormSchema.safeParse({ ...validInquiry, phone: "", email: "" });

    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = inquiryFormSchema.safeParse({ ...validInquiry, consent: false });

    expect(result.success).toBe(false);
  });
});

describe("formPayloadSchema", () => {
  it("strips the honeypot and accepts a valid inquiry payload", () => {
    const result = formPayloadSchema.safeParse({
      ...validInquiry,
      kind: "inquiry",
      meta,
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid inquiry payload", () => {
    const result = inquiryPayloadSchema.safeParse({
      ...validInquiry,
      message: "kratko",
      kind: "inquiry",
      meta,
    });

    expect(result.success).toBe(false);
  });
});
