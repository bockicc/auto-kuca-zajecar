const numberFormatter = new Intl.NumberFormat("sr-Latn-RS");

export function formatMileage(value: number) {
  return `${numberFormatter.format(value)} km`;
}

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}
