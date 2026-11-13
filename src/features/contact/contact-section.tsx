"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { contactChannels, dealership } from "@/lib/constants";

import { ContactMap } from "./contact-map";
import { OpeningHoursList } from "./opening-hours";

const channelIcons = {
  phone: Phone,
  viber: MessageCircle,
  whatsapp: MessageCircle,
  email: Mail,
} as const;

export function ContactSection() {
  return (
    <section className="section" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-widest text-[#2A8C94] font-semibold">Kontakt</p>
        <h2 id="contact-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
          Tu smo za svako pitanje
        </h2>
        <p className="mt-3 text-gray-400">
          Pozovite, pišite ili svratite. Bez pritiska i bez skrivenih troškova, prvo pogledajte
          vozilo, pa odlučite.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactChannels.map((channel) => {
              const Icon = channelIcons[channel.id];

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-[#22252A]/60 p-4 transition-all duration-300 hover:border-white/20 hover:bg-[#22252A]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A8C94]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1D6369]/20 text-[#2A8C94] group-hover:bg-[#1D6369]/40 transition-colors">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{channel.label}</span>
                    <span className="block truncate text-sm text-gray-400">{channel.value}</span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#22252A]/60 p-5">
            <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#2A8C94]" />
            <div className="text-sm">
              <p className="font-semibold text-white">Adresa</p>
              <p className="text-gray-400">
                {dealership.street}
                <br />
                {dealership.postalCode} {dealership.city}, {dealership.country}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#22252A]/60 p-5">
            <OpeningHoursList />
          </div>
        </div>

        <ContactMap />
      </div>
    </section>
  );
}