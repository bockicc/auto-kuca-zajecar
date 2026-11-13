import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { dealership } from "@/lib/constants";
import { getAvailableVehicles, getBrands } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { BODY_TYPE_LABELS } from "@/types";
import type { BodyType } from "@/types";

const bodyOptions = Object.entries(BODY_TYPE_LABELS) as Array<[BodyType, string]>;

export function VehicleSearchSection() {
  const navigate = useNavigate();
  const formId = React.useId();
  const [brand, setBrand] = React.useState("");
  const [body, setBody] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const brands = React.useMemo(getBrands, []);
  const availableCount = React.useMemo(() => getAvailableVehicles().length, []);
  const yearsOnMarket = new Date().getFullYear() - dealership.foundedYear;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate({
      to: "/vozila",
      search: {
        brand: brand || undefined,
        body: body || undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      },
    });
  }

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-background"
      aria-labelledby="pretraga-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,var(--brand-soft),transparent_55%)] opacity-70"
      />
      <div className="container-page relative py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Brza pretraga
            </p>
            <h2
              id="pretraga-heading"
              className="mt-2 text-3xl font-bold tracking-[-0.02em] sm:text-4xl"
            >
              Pronađite vozilo koje vam odgovara
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Izaberite marku, karoseriju i budžet, prikazaćemo samo vozila koja su trenutno
              dostupna.
            </p>

            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-border/80 pt-6">
              <div>
                <dt className="text-xs text-muted-foreground">Vozila u ponudi</dt>
                <dd className="mt-1 text-2xl font-bold tabular">{formatNumber(availableCount)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Marki</dt>
                <dd className="mt-1 text-2xl font-bold tabular">{formatNumber(brands.length)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Godina iskustva</dt>
                <dd className="mt-1 text-2xl font-bold tabular">{formatNumber(yearsOnMarket)}+</dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface p-5 shadow-[0_28px_70px_-32px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/[0.03] sm:p-7"
            aria-label="Brza pretraga vozila"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor={`${formId}-brand`}
                  className="block pl-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Marka
                </label>
                <Select
                  id={`${formId}-brand`}
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  className="h-12 rounded-md border-border bg-background px-3.5 pr-10 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-accent/60 focus-visible:border-accent focus-visible:outline-offset-2 [&>option]:bg-surface [&>option]:text-foreground"
                >
                  <option value="">Sve marke</option>
                  {brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`${formId}-body`}
                  className="block pl-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Karoserija
                </label>
                <Select
                  id={`${formId}-body`}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  className="h-12 rounded-md border-border bg-background px-3.5 pr-10 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-accent/60 focus-visible:border-accent focus-visible:outline-offset-2 [&>option]:bg-surface [&>option]:text-foreground"
                >
                  <option value="">Sve karoserije</option>
                  {bodyOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`${formId}-price`}
                  className="block pl-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Budžet do
                </label>
                <Select
                  id={`${formId}-price`}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  className="h-12 rounded-md border-border bg-background px-3.5 pr-10 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-accent/60 focus-visible:border-accent focus-visible:outline-offset-2 [&>option]:bg-surface [&>option]:text-foreground"
                >
                  <option value="">Bez ograničenja</option>
                  <option value="10000">10.000 €</option>
                  <option value="15000">15.000 €</option>
                  <option value="20000">20.000 €</option>
                  <option value="30000">30.000 €</option>
                </Select>
              </div>
            </div>

            <button
              type="submit"
              className={buttonVariants({
                size: "lg",
                className:
                  "group mt-5 h-12 w-full rounded-md text-sm font-semibold shadow-[0_18px_36px_-18px_rgba(29,99,105,0.9)] transition-[background-color,box-shadow] duration-200 hover:shadow-[0_22px_44px_-18px_rgba(36,117,124,0.8)] focus-visible:outline-offset-2",
              })}
            >
              <Search
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:scale-110"
              />
              Pretraži ponudu
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
