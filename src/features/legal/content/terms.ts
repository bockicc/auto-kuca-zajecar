import type { LegalDocument } from "./privacy";

export const termsOfUse: LegalDocument = {
  title: "Uslovi korišćenja",
  description:
    "Pravila korišćenja sajta Auto kuće Zaječar, sadržaja oglasa i informacija o vozilima.",
  updatedAt: "2026-01-15",
  sections: [
    {
      id: "prihvatanje",
      heading: "Prihvatanje uslova",
      paragraphs: [
        "Korišćenjem ovog sajta prihvatate uslove navedene na ovoj stranici. Ako se ne slažete sa uslovima, molimo vas da ne koristite sajt.",
      ],
    },
    {
      id: "sadrzaj",
      heading: "Sadržaj sajta",
      paragraphs: [
        "Informacije o vozilima, cenama i dostupnosti su informativnog karaktera. Trudimo se da budu tačne i ažurne, ali zadržavamo pravo ispravke grešaka i izmena bez prethodne najave.",
        "Fotografije vozila su ilustrativne. Detaljan opis, oprema i stanje vozila potvrđuju se na licu mesta pre kupovine.",
      ],
    },
    {
      id: "cene",
      heading: "Cene i dostupnost",
      paragraphs: [
        "Cene su iskazane u evrima, sa uračunatim porezom, osim ako nije drugačije navedeno. Cena ne uključuje troškove registracije, osiguranja i prenosa vlasništva, osim kada je to izričito navedeno.",
        "Vozilo može biti prodato ili rezervisano pre ažuriranja sajta. Dostupnost uvek potvrdite telefonom ili upitom.",
      ],
    },
    {
      id: "intelektualna",
      heading: "Intelektualna svojina",
      paragraphs: [
        "Sadržaj sajta, uključujući tekstove, fotografije, logo i dizajn, zaštićen je autorskim pravima. Nije dozvoljeno kopiranje, distribucija ili komercijalna upotreba bez pismene saglasnosti.",
      ],
    },
    {
      id: "odgovornost",
      heading: "Ograničenje odgovornosti",
      paragraphs: [
        "Ne odgovaramo za štetu nastalu korišćenjem sajta ili oslanjanjem na informacije objavljene na njemu. Kupovina vozila reguliše se posebnim ugovorom i važećim zakonima Republike Srbije.",
      ],
    },
    {
      id: "linkovi",
      heading: "Eksterni linkovi",
      paragraphs: [
        "Sajt može sadržati linkove ka drugim sajtovima. Ne kontrolišemo njihov sadržaj i ne odgovaramo za njihove politike privatnosti ili uslove korišćenja.",
      ],
    },
    {
      id: "izmene",
      heading: "Izmene uslova",
      paragraphs: [
        "Zadržavamo pravo izmene ovih uslova. Izmene stupaju na snagu objavljivanjem na sajtu. Preporučujemo povremeno proveravanje ove stranice.",
      ],
    },
    {
      id: "pravo",
      heading: "Primenjivo pravo",
      paragraphs: [
        "Na ove uslove primenjuje se pravo Republike Srbije. Za sporove je nadležan sud u Zaječaru, osim kada zakon određuje drugačiju nadležnost.",
      ],
    },
  ],
};
