export const siteConfig = {
  name: "Auto kuća Zaječar",
  shortName: "AK Zaječar",
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://autokucazajecar.rs",
  locale: "sr_RS",
  language: "sr-Latn",
  defaultTitle: "Auto kuća Zaječar | Pouzdana vozila, transparentne cene",
  defaultDescription:
    "Polovna i nova vozila u Zaječaru. Proverena vozila, jasna istorija i fer cene. Zakažite probnu vožnju već danas.",
  ogImage: "/images/og-default.png",
  themeColor: "#22252a",
  contentUpdatedAt: (import.meta.env.VITE_CONTENT_UPDATED_AT as string | undefined) ?? null,
} as const;
