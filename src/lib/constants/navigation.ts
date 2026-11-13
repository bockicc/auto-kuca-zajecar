export const mainNav = [
  { label: "Početna", to: "/" },
  { label: "Vozila", to: "/vozila" },
  { label: "O nama", to: "/o-nama" },
  { label: "Česta pitanja", to: "/faq" },
  { label: "Kontakt", to: "/kontakt" },
] as const;

export const legalNav = [
  { label: "Politika privatnosti", to: "/politika-privatnosti" },
  { label: "Uslovi korišćenja", to: "/uslovi-koriscenja" },
  { label: "Politika kolačića", to: "/politika-kolacica" },
] as const;

export const footerQuickLinks = [
  { label: "Ponuda vozila", to: "/vozila" },
  { label: "Zakaži probnu vožnju", to: "/kontakt" },
  { label: "Finansiranje", to: "/faq" },
  { label: "Zamena vozila", to: "/faq" },
] as const;
