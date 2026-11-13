export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const faqEntries: FaqEntry[] = [
  {
    id: "test-drive",
    question: "Da li mogu da zakažem probnu vožnju?",
    answer:
      "Da. Probnu vožnju možete zakazati telefonom, preko kontakt forme ili dugmetom na stranici vozila. Termin potvrđujemo dan ranije, a vožnja traje do 30 minuta.",
  },
  {
    id: "history",
    question: "Da li proveravate poreklo i istoriju vozila?",
    answer:
      "Svako vozilo prolazi proveru dokumentacije, kilometraže i osnovnih mehaničkih sistema. Za vozila iz uvoza dostupna je servisna istorija kada je proizvođač evidentira.",
  },
  {
    id: "trade-in",
    question: "Da li je moguća zamena staro za novo?",
    answer:
      "Da. Vaše vozilo procenjujemo na licu mesta, bez obaveze kupovine. Procena traje do 30 minuta, a razliku možete platiti gotovinom, karticom ili kroz finansiranje.",
  },
  {
    id: "financing",
    question: "Da li nudite finansiranje i lizing?",
    answer:
      "Sarađujemo sa bankama i lizing kompanijama. Pomažemo pri pripremi dokumentacije i izračunu mesečne rate. Uslovi zavise od banke, iznosa učešća i trajanja otplate.",
  },
  {
    id: "warranty",
    question: "Kakva je garancija na vozila?",
    answer:
      "Za polovna vozila dajemo garanciju na skrivene mane u skladu sa zakonom, uz mogućnost produžene garancije. Nova vozila imaju garanciju proizvođača.",
  },
  {
    id: "buyout",
    question: "Da li otkupljujete vozila?",
    answer:
      "Da. Otkup radimo po tržišnoj proceni, uz brzu isplatu i preuzimanje dokumentacije. Pošaljite osnovne podatke i fotografije kako bismo pripremili procenu.",
  },
  {
    id: "price",
    question: "Da li je cena u oglasu konačna?",
    answer:
      "Cene su iskazane sa uračunatim porezom i odnose se na vozilo u viđenom stanju. Moguća je korekcija u slučaju zamene ili dodatne opreme, o čemu se dogovaramo pre kupovine.",
  },
  {
    id: "availability",
    question: "Kako da proverim da li je vozilo dostupno?",
    answer:
      "Pozovite nas ili pošaljite upit sa šifrom vozila. Status na sajtu ažuriramo redovno, ali vozilo može biti rezervisano u toku dana.",
  },
  {
    id: "invoice",
    question: "Da li izdajete račun i sređujete prenos?",
    answer:
      "Da. Kupovina se dokumentuje računom, a pomažemo i oko prenosa vlasništva, registracije i osiguranja. Sve troškove dobijate jasno navedene unapred.",
  },
  {
    id: "saturday",
    question: "Da li radite subotom?",
    answer:
      "Radimo subotom od 09:00 do 14:00. Nedeljom ne radimo, ali možete poslati upit i odgovorićemo prvog radnog dana.",
  },
];
