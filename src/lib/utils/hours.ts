import type { OpeningHours } from "@/types";

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);

  return hours * 60 + minutes;
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  today: OpeningHours | undefined;
}

export function getOpenStatus(hours: OpeningHours[], now = new Date()): OpenStatus {
  const today = hours.find((entry) => entry.day === now.getDay());
  const current = now.getHours() * 60 + now.getMinutes();

  if (!today || today.closed) {
    return { isOpen: false, label: "Danas zatvoreno", today };
  }

  const opens = toMinutes(today.open);
  const closes = toMinutes(today.close);

  if (current < opens) {
    return { isOpen: false, label: `Otvara se u ${today.open}`, today };
  }

  if (current >= closes) {
    return { isOpen: false, label: "Trenutno zatvoreno", today };
  }

  return { isOpen: true, label: `Otvoreno do ${today.close}`, today };
}
