export const dealership = {
  legalName: "Auto kuća Zaječar DOO",
  name: "Auto kuća Zaječar",
  street: "Nikole Pašića 12",
  city: "Zaječar",
  postalCode: "19000",
  country: "Srbija",
  taxId: "123456789",
  phone: "+381 60 123 4567",
  phoneHref: "tel:+381601234567",
  email: "info@autokucazajecar.rs",
  foundedYear: 2008,
  social: {
    facebook: "https://www.facebook.com/autokucazajecar",
    instagram: "https://www.instagram.com/autokucazajecar",
  },
} as const;

export const fullAddress = `${dealership.street}, ${dealership.postalCode} ${dealership.city}, ${dealership.country}`;

export const mapEmbedUrl =
  "https://www.google.com/maps?q=Zaje%C4%8Dar,+Srbija&output=embed";
