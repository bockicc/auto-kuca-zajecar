const diacritics: Record<string, string> = {
  č: "c",
  ć: "c",
  ž: "z",
  š: "s",
  đ: "d",
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[čćžšđ]/g, (character) => diacritics[character] ?? character)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeForSearch(value: string) {
  return value
    .toLowerCase()
    .replace(/[čćžšđ]/g, (character) => diacritics[character] ?? character)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
