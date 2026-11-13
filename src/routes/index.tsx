import { Link, createFileRoute } from "@tanstack/react-router";
import { BadgeEuro, Handshake, ShieldCheck, Wrench } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactSection } from "@/features/contact";
import { CtaBanner } from "@/features/cta";
import { FaqSection } from "@/features/faq";
import { HeroSection, VehicleSearchSection } from "@/features/hero";
import { VehicleGrid } from "@/features/inventory";
import { dealership, siteConfig } from "@/lib/constants";
import { getFeaturedVehicles } from "@/lib/data";
import { buildAutoDealerJsonLd, buildSeo, JsonLd, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: toMetaTags(
      buildSeo({
        title: siteConfig.defaultTitle,
        description: siteConfig.defaultDescription,
        path: "/",
      }),
    ),
  }),
});

const advantages = [
  {
    icon: ShieldCheck,
    title: "Provereno poreklo",
    description:
      "Svako vozilo prolazi proveru dokumentacije i istorije pre nego što se nađe u ponudi.",
  },
  {
    icon: BadgeEuro,
    title: "Transparentne cene",
    description:
      "Cene su jasno istaknute, sa uračunatim porezom. Bez skrivenih troškova i iznenađenja.",
  },
  {
    icon: Handshake,
    title: "Zamena i finansiranje",
    description: "Procenjujemo vaše vozilo i pomažemo oko finansiranja ili lizinga po meri.",
  },
  {
    icon: Wrench,
    title: "Podrška posle kupovine",
    description:
      "Pomažemo oko registracije, osiguranja i servisa, čak i nakon što preuzmete ključeve.",
  },
];

function HomePage() {
  const featured = getFeaturedVehicles(4);

  return (
    <>
      <JsonLd data={buildAutoDealerJsonLd()} />
      <HeroSection />
      <VehicleSearchSection />

      <section className="section" aria-labelledby="featured-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">Izdvojeno</p>
              <h2 id="featured-heading" className="mt-2 text-3xl font-bold tracking-tight">
                Vozila koja vredi pogledati
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Pažljivo odabrana vozila iz naše ponude. Svako je provereno i spremno za probnu
                vožnju.
              </p>
            </div>
            <Link to="/vozila" className={buttonVariants({ variant: "secondary" })}>
              Sva vozila
            </Link>
          </div>
          <div className="mt-6">
            <VehicleGrid vehicles={featured} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface" aria-labelledby="advantages-heading">
        <div className="container-page py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Zašto baš mi</p>
            <h2 id="advantages-heading" className="mt-2 text-3xl font-bold tracking-tight">
              Kupovina bez stresa
            </h2>
            <p className="mt-3 text-muted-foreground">
              Od {dealership.foundedYear}. godine gradimo poverenje na jasnoj komunikaciji i fer
              odnosu prema svakom kupcu.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <Card
                key={advantage.title}
                className="relative group p-6 bg-[#22252A] border border-white/10 hover:border-[#1D6369]/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-4 right-4 text-3xl font-bold text-white/[0.06] group-hover:text-[#1D6369]/25 transition-colors pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex size-12 items-center justify-center rounded-xl bg-[#1D6369]/15 border border-[#1D6369]/30 text-[#2A8C94] group-hover:bg-[#1D6369]/25 group-hover:border-[#1D6369]/50 transition-all duration-300">
                  <advantage.icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{advantage.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{advantage.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 grid gap-4 sm:grid-cols-3 text-center">
            <div className="py-4">
              <p className="text-3xl font-bold tracking-tight text-white">18+</p>
              <p className="mt-1 text-sm text-muted-foreground">godina iskustva</p>
            </div>
            <div className="py-4 border-x border-white/10 sm:border-x">
              <p className="text-3xl font-bold tracking-tight text-white">1.200+</p>
              <p className="mt-1 text-sm text-muted-foreground">prodatih vozila</p>
            </div>
            <div className="py-4">
              <p className="text-3xl font-bold tracking-tight text-white">100%</p>
              <p className="mt-1 text-sm text-muted-foreground">provereno poreklo</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection className="section" limit={5} showAllLink />

      <ContactSection />

      <CtaBanner />
    </>
  );
}
