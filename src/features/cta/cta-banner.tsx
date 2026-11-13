"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { dealership } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative border-t border-white/10 bg-gradient-to-b from-[#1E2025] to-[#181A1E]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D6369]/5 via-transparent to-[#2A8C94]/5" />
      <div className="container-page relative py-14 md:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-r from-[#22252A]/90 to-[#1E2025]/90 p-8 md:p-12 backdrop-blur-sm shadow-[0_0_40px_rgba(29,99,105,0.08)]">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#2A8C94] font-semibold">
                Spremni za probnu vožnju?
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Izaberite vozilo iz ponude ili nas pozovite, dogovorićemo termin koji vam odgovara.
              </h2>
              <p className="text-gray-400 max-w-xl">
                Od {dealership.foundedYear}. godine gradimo poverenje na jasnoj komunikaciji i fer odnosu prema svakom kupcu.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <Link
                to="/vozila"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "bg-[#1D6369] hover:bg-[#2A8C94] text-white border-0 shadow-[0_0_20px_rgba(29,99,105,0.3)] hover:shadow-[0_0_30px_rgba(42,140,148,0.4)] transition-all duration-300",
                })}
              >
                Pogledajte ponudu
                <ArrowRight aria-hidden="true" />
              </Link>
              <a
                href={dealership.phoneHref}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300",
                })}
              >
                {dealership.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}