export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OpeningHours {
  day: Weekday;
  open: string;
  close: string;
  closed?: boolean;
}

export interface ContactChannel {
  id: "phone" | "viber" | "whatsapp" | "email";
  label: string;
  value: string;
  href: string;
}

export interface ContactDetails {
  phone: string;
  email: string;
  address: string;
}
