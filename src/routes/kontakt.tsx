import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { ContactMap, OpeningHoursList } from "@/features/contact";
import { ContactForm } from "@/features/forms";
import { dealership } from "@/lib/constants";
import { buildSeo, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/kontakt")({
  component: ContactPage,
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "Kontakt | Auto kuća Zaječar",
          description:
            "Kontaktirajte Auto kuću Zaječar: adresa, telefon, e-pošta, radno vreme i mapa. Pošaljite upit ili zakažite probnu vožnju.",
          path: "/kontakt",
        }),
      ),
    }),
});

function ContactPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Početna", to: "/" }, { label: "Kontakt" }]} />

      <div className="mt-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2A8C94]">
          Tu smo za vas
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Kontakt</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
          Imate pitanje o vozilu, finansiranju ili zameni? Pošaljite upit ili nas pozovite, bez
          obaveze i bez pritiska.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-4 text-[#2A8C94]" />
            {dealership.street}, {dealership.postalCode} {dealership.city}
          </span>
          <span aria-hidden="true" className="text-white/20">
            ·
          </span>
          <a
            href={dealership.phoneHref}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#2A8C94]"
          >
            <Phone aria-hidden="true" className="size-4 text-[#2A8C94]" />
            {dealership.phone}
          </a>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
        <Card className="min-w-0 rounded-2xl border border-white/10 bg-[#22252A]/60 p-4 shadow-none sm:p-6 lg:col-span-7">
          <h2 className="text-xl font-semibold text-white">Pošaljite upit</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-400">
            Odgovaramo u toku radnog dana. Za hitne stvari nas pozovite.
          </p>
          <div className="mt-5">
            <ContactForm sourcePage="/kontakt" />
          </div>
        </Card>

        <aside
          className="min-w-0 space-y-4 sm:space-y-5 lg:col-span-5"
          aria-label="Lokacija, radno vreme i podaci o firmi"
        >
          <ContactMap heightClassName="h-[280px] sm:h-[350px]" />

          <div className="rounded-2xl border border-white/10 bg-[#22252A]/60 p-4 sm:p-5">
            <OpeningHoursList />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#22252A]/60 p-4 sm:p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#2A8C94]">
              Podaci o firmi
            </h2>
            <p className="mt-2 text-sm font-semibold text-white">{dealership.legalName}</p>
            <ul className="mt-3 space-y-3 text-sm text-gray-400 sm:space-y-2.5">
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#2A8C94]" />
                <span>
                  {dealership.street}
                  <br />
                  {dealership.postalCode} {dealership.city}, {dealership.country}
                </span>
              </li>
              <li>
                <a
                  href={dealership.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-[#2A8C94]"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {dealership.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dealership.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-[#2A8C94]"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {dealership.email}
                </a>
              </li>
              <li className="border-t border-white/5 pt-3 text-xs text-gray-500 sm:pt-2">
                PIB: {dealership.taxId}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}