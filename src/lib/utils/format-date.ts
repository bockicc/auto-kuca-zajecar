const dateFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(value: Date | string) {
  return dateFormatter.format(new Date(value));
}

export function formatLongDate(value: Date | string) {
  return longDateFormatter.format(new Date(value));
}

export function formatWeekday(value: Date | number) {
  return new Intl.DateTimeFormat("sr-Latn-RS", { weekday: "long" }).format(
    typeof value === "number" ? new Date(2024, 0, 7 + value) : value,
  );
}
