export type ConsentValue = "accepted" | "rejected" | "unset";

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string | null;
}

export interface StoredConsent extends ConsentState {
  version: number;
}
