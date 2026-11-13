export function normalizePhone(value: string) {
  const trimmed = value.trim();
  const normalized = trimmed.replace(/[\s()/-]/g, "");

  if (normalized.startsWith("00")) return `+${normalized.slice(2)}`;

  return normalized;
}

export function isValidSerbianPhone(value: string) {
  const normalized = normalizePhone(value);

  return /^(?:\+381|0)6\d{7,8}$/.test(normalized);
}

export function phoneToTelHref(value: string) {
  return `tel:${normalizePhone(value)}`;
}
