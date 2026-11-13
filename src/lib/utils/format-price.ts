const priceFormatter = new Intl.NumberFormat("sr-Latn-RS", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

export function formatPriceDelta(current: number, previous: number) {
  const delta = previous - current;

  if (delta <= 0) return null;

  return `-${priceFormatter.format(delta)}`;
}
