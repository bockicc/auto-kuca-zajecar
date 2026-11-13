"use client";

import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { faqEntries } from "./faq-content";

interface FaqSectionProps {
  className?: string;
  limit?: number;
  showAllLink?: boolean;
}

export function FaqSection({ className, limit, showAllLink = false }: FaqSectionProps) {
  const entries = React.useMemo(
    () => (typeof limit === "number" ? faqEntries.slice(0, limit) : faqEntries),
    [limit],
  );
  const [openId, setOpenId] = React.useState<string | null>(() => entries[0]?.id ?? null);
  const baseId = React.useId();
  const headingId = `${baseId}-heading`;

  React.useEffect(() => {
    if (openId !== null && !entries.some((entry) => entry.id === openId)) {
      setOpenId(entries[0]?.id ?? null);
    }
  }, [entries, openId]);

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2A8C94]">
          Česta pitanja
        </p>
        <h2
          id={headingId}
          className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          Sve što vas zanima pre kupovine
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
          Ako ne pronađete odgovor, pozovite nas ili pošaljite upit, odgovaramo bez obaveze.
        </p>

        <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
          {entries.map((item) => {
            const isOpen = openId === item.id;
            const triggerId = `${baseId}-${item.id}-trigger`;
            const panelId = `${baseId}-${item.id}-panel`;

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#1D6369]/40 bg-[#22252A] shadow-[0_0_30px_rgba(29,99,105,0.12)]"
                    : "border-white/10 bg-[#22252A]/60 hover:border-[#1D6369]/30 hover:bg-[#22252A]/80"
                }`}
              >
                <button
                  type="button"
                  id={triggerId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2A8C94] sm:p-5"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="pr-2 text-sm font-semibold leading-snug text-white sm:pr-4 sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-180 text-[#2A8C94]" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-white/10 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-300 sm:px-5 sm:pb-5 sm:pt-4 md:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showAllLink && (
          <div className="mt-6 text-center">
            <Link
              to="/faq"
              className="text-sm font-semibold text-[#2A8C94] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Pogledajte sva česta pitanja
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}