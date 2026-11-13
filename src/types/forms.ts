export type InquiryTopic = "vehicle" | "financing" | "trade-in" | "service" | "other";

export const INQUIRY_TOPIC_LABELS: Record<InquiryTopic, string> = {
  vehicle: "Pitanje o vozilu",
  financing: "Finansiranje",
  "trade-in": "Zamena vozila",
  service: "Servis",
  other: "Ostalo",
};

export interface FormMeta {
  sourcePage: string;
  submittedAt: string;
  utm?: Record<string, string>;
  website?: string;
}

export interface TestDrivePayload {
  kind: "test-drive";
  vehicleSlug: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  consent: true;
  meta: FormMeta;
}

export interface InquiryPayload {
  kind: "inquiry";
  fullName: string;
  phone?: string;
  email?: string;
  topic: InquiryTopic;
  vehicleSlug?: string;
  message: string;
  consent: true;
  meta: FormMeta;
}

export type FormPayload = TestDrivePayload | InquiryPayload;

export interface SubmissionResult {
  ok: true;
  reference: string;
  receivedAt: string;
}

export type SubmissionErrorCode = "rate-limited" | "validation" | "server";

export interface SubmissionError {
  ok: false;
  code: SubmissionErrorCode;
  message: string;
}
