import { InquiryForm } from "./inquiry-form";

interface ContactFormProps {
  sourcePage?: string;
}

export function ContactForm({ sourcePage = "/kontakt" }: ContactFormProps) {
  return <InquiryForm sourcePage={sourcePage} />;
}
