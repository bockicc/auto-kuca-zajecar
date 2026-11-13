"use client";

import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { useConsent } from "@/features/legal";
import { dealership, footerQuickLinks, legalNav, openingHours } from "@/lib/constants";
import { getLatestUpdateDate } from "@/lib/data";
import { formatLongDate, formatWeekday } from "@/lib/utils";

export function Footer() {
  const { openPreferences } = useConsent();
  const updatedAt = getLatestUpdateDate();

  return (
    <footer className="border-t border-white/10 bg-[#181A1E]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="text-xl font-bold text-white">{dealership.name}</p>
          <p className="max-w-xs text-sm text-gray-500 leading-relaxed">
            Proverena vozila, transparentne cene i podrška pre i posle kupovine.
          </p>
          <div className="flex gap-2 pt-2">
            <a
              href={dealership.social.facebook}
              aria-label="Facebook stranica"
              className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#22252A]/60 text-gray-400 transition-all duration-300 hover:border-[#1D6369]/50 hover:bg-[#1D6369]/20 hover:text-[#2A8C94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A8C94]"
            >
              <Facebook aria-hidden="true" className="size-5" />
            </a>
            <a
              href={dealership.social.instagram}
              aria-label="Instagram profil"
              className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#22252A]/60 text-gray-400 transition-all duration-300 hover:border-[#1D6369]/50 hover:bg-[#1D6369]/20 hover:text-[#2A8C94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A8C94]"
            >
              <Instagram aria-hidden="true" className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#2A8C94] font-semibold">Brzi linkovi</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerQuickLinks.map((item) => (
              <li key={`${item.to}-${item.label}`}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-[#2A8C94] hover:translate-x-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#2A8C94] font-semibold">Kontakt</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#2A8C94]/80" />
              <span className="leading-relaxed">
                {dealership.street}
                <br />
                {dealership.postalCode} {dealership.city}
              </span>
            </li>
            <li>
              <a href={dealership.phoneHref} className="flex items-center gap-3 text-gray-400 transition-colors duration-200 hover:text-[#2A8C94]">
                <Phone aria-hidden="true" className="size-5 shrink-0" />
                {dealership.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${dealership.email}`} className="flex items-center gap-3 text-gray-400 transition-colors duration-200 hover:text-[#2A8C94]">
                <Mail aria-hidden="true" className="size-5 shrink-0" />
                {dealership.email}
              </a>
            </li>
            <li className="text-xs text-gray-600 pt-2 border-t border-white/5">
              PIB: {dealership.taxId}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#2A8C94] font-semibold">Radno vreme</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            {openingHours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-3">
                <span className="capitalize">{formatWeekday(entry.day)}</span>
                <span className="font-mono tabular-nums">
                  {entry.closed ? "Zatvoreno" : `${entry.open}–${entry.close}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {dealership.legalName}. Sva prava zadržana.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalNav.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-500 transition-colors duration-200 hover:text-[#2A8C94]">
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openPreferences}
              className="text-gray-500 transition-colors duration-200 hover:text-[#2A8C94] hover:underline"
            >
              Podešavanja kolačića
            </button>
            <span className="text-gray-600">Poslednje ažurirano: {formatLongDate(updatedAt)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}