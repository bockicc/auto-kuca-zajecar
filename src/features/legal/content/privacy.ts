export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  title: "Politika privatnosti",
  description:
    "Kako Auto kuća Zaječar prikuplja, koristi i štiti lične podatke koje nam ostavljate putem sajta.",
  updatedAt: "2026-01-15",
  sections: [
    {
      id: "rukovalac",
      heading: "Rukovalac podacima",
      paragraphs: [
        "Rukovalac podacima je Auto kuća Zaječar DOO, Nikole Pašića 12, 19000 Zaječar, Srbija. Za pitanja o privatnosti možete nas kontaktirati na info@autokucazajecar.rs ili na telefon +381 60 123 4567.",
      ],
    },
    {
      id: "podaci",
      heading: "Koje podatke prikupljamo",
      paragraphs: [
        "Prikupljamo samo podatke koje nam dobrovoljno ostavite putem kontakt forme, forme za probnu vožnju ili telefonom.",
      ],
      bullets: [
        "Ime i prezime",
        "Broj telefona i/ili e-mail adresa",
        "Podaci o vozilu koje vas zanima",
        "Sadržaj poruke i izabrani termin probne vožnje",
        "Tehnički podaci o poseti sajtu, ako ste prihvatili analitičke kolačiće",
      ],
    },
    {
      id: "svrhe",
      heading: "Svrhe i pravni osnov obrade",
      paragraphs: [
        "Podatke koristimo radi odgovora na upit, zakazivanja probne vožnje, pripreme ponude i komunikacije u vezi sa kupovinom. Obrada se zasniva na vašoj saglasnosti i na radnjama pre zaključenja ugovora.",
        "Analitičke podatke koristimo isključivo uz vašu saglasnost, radi poboljšanja sadržaja i funkcionalnosti sajta.",
      ],
    },
    {
      id: "cuvanje",
      heading: "Koliko dugo čuvamo podatke",
      paragraphs: [
        "Podatke iz upita čuvamo do 12 meseci od poslednje komunikacije, osim kada zakon nalaže duže čuvanje. Podatke o kupovini čuvamo u rokovima propisanim poreskim i računovodstvenim propisima.",
      ],
    },
    {
      id: "primalac",
      heading: "Kome prosleđujemo podatke",
      paragraphs: [
        "Podatke ne prodajemo trećim licima. Možemo ih podeliti sa pružaocima usluga hostinga, e-mail komunikacije i finansiranja, isključivo u meri potrebnoj za pružanje usluge i uz odgovarajuće mere zaštite.",
      ],
    },
    {
      id: "prava",
      heading: "Vaša prava",
      paragraphs: [
        "Imate pravo da zatražite pristup, ispravku, brisanje ili ograničenje obrade svojih podataka, kao i da povučete saglasnost u svakom trenutku. Zahtev možete poslati na info@autokucazajecar.rs.",
        "Ako smatrate da je obrada nezakonita, možete se obratiti Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.",
      ],
    },
    {
      id: "bezbednost",
      heading: "Bezbednost podataka",
      paragraphs: [
        "Primenjujemo tehničke i organizacione mere zaštite, uključujući ograničen pristup podacima i bezbednu komunikaciju. Nijedan prenos podataka putem interneta nije potpuno bez rizika, ali činimo sve razumne korake da ga smanjimo.",
      ],
    },
    {
      id: "kontakt",
      heading: "Kontakt",
      paragraphs: [
        "Za sva pitanja o obradi podataka pišite na info@autokucazajecar.rs ili nas pozovite na +381 60 123 4567. Odgovorićemo u roku od 30 dana.",
      ],
    },
  ],
};
