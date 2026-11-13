import type { LegalDocument } from "./privacy";

export const cookiePolicy: LegalDocument = {
  title: "Politika kolačića",
  description:
    "Koje kolačiće koristimo, zašto ih koristimo i kako možete upravljati svojim izborom.",
  updatedAt: "2026-01-15",
  sections: [
    {
      id: "sta-su",
      heading: "Šta su kolačići",
      paragraphs: [
        "Kolačići su male tekstualne datoteke koje se čuvaju na vašem uređaju kada posetite sajt. Pomažu sajtu da zapamti vaš izbor, omoguće osnovne funkcije i, uz saglasnost, prikupe anonimne statističke podatke.",
      ],
    },
    {
      id: "neophodni",
      heading: "Neophodni kolačići",
      paragraphs: [
        "Ovi kolačići su potrebni za rad sajta i ne mogu se isključiti. Čuvaju vaš izbor teme, podešavanja kolačića i osnovne bezbednosne parametre.",
      ],
    },
    {
      id: "analiticki",
      heading: "Analitički kolačići",
      paragraphs: [
        "Koristimo ih da razumemo kako posetioci koriste sajt: koje stranice posećuju i kako dolaze do nas. Podaci su anonimizovani i koriste se samo ako ste dali saglasnost.",
      ],
    },
    {
      id: "marketing",
      heading: "Marketinški kolačići",
      paragraphs: [
        "Ovi kolačići omogućavaju merenje kampanja i prikaz relevantnijeg sadržaja. Aktiviraju se isključivo uz vašu saglasnost i možete ih isključiti u svakom trenutku.",
      ],
    },
    {
      id: "upravljanje",
      heading: "Kako da upravljate kolačićima",
      paragraphs: [
        "Svoj izbor možete promeniti klikom na „Podešavanja kolačića” u podnožju sajta. Kolačiće možete obrisati i u podešavanjima pregledača, ali to može uticati na rad sajta.",
      ],
    },
    {
      id: "trajanje",
      heading: "Trajanje kolačića",
      paragraphs: [
        "Sesijski kolačići se brišu zatvaranjem pregledača. Trajni kolačići ostaju do isteka roka ili do brisanja. Vaš izbor kolačića čuvamo do 12 meseci.",
      ],
    },
    {
      id: "kontakt",
      heading: "Kontakt",
      paragraphs: [
        "Za pitanja o kolačićima pišite na info@autokucazajecar.rs. Više o obradi podataka pročitajte u Politici privatnosti.",
      ],
    },
  ],
};
