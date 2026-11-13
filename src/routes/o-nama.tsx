import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Car,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { dealership } from "@/lib/constants";
import { getAvailableVehicles, getBrands } from "@/lib/data";
import { buildSeo, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/o-nama")({
  component: AboutPage,
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "O nama | Auto kuća Zaječar",
          description:
            "Upoznajte Auto kuću Zaječar: više od 18 godina iskustva, proverena vozila i fer odnos prema kupcima.",
          path: "/o-nama",
        }),
      ),
    }),
});

const values = [
  {
    icon: ShieldCheck,
    title: "Poverenje",
    description: "Jasna istorija vozila i otvorena komunikacija od prvog poziva do predaje ključeva.",
  },
  {
    icon: HeartHandshake,
    title: "Fer odnos",
    description: "Bez pritiska i skrivenih troškova. Savetujemo ono što bismo izabrali i za sebe.",
  },
  {
    icon: Award,
    title: "Kvalitet",
    description: "Birana vozila sa urednom dokumentacijom i proverenim osnovnim mehaničkim stanjem.",
  },
  {
    icon: Users,
    title: "Podrška",
    description: "Tu smo i posle kupovine: registracija, servis i sva dodatna pitanja.",
  },
];

function AboutPage() {
  const availableCount = getAvailableVehicles().length;
  const brandCount = getBrands().length;
  const years = new Date().getFullYear() - dealership.foundedYear;

  const stats = [
    { label: "Godina iskustva", value: `${years}+`, icon: CalendarDays },
    { label: "Vozila u ponudi", value: `${availableCount}`, icon: Car },
    { label: "Marki u ponudi", value: `${brandCount}`, icon: BadgeCheck },
    { label: "Zadovoljnih kupaca", value: "500+", icon: Users },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Početna", to: "/" }, { label: "O nama" }]} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2A8C94]">O nama</p>
          <h1 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Više od {years} godina uz vozače iz Zaječara
          </h1>
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-400 sm:text-base">
            <p>
              Auto kuća Zaječar nastala je {dealership.foundedYear}. godine iz jednostavne ideje:
              da kupovina polovnog vozila može biti mirna, jasna i bez neprijatnih iznenađenja.
            </p>
            <p>
              Od tada smo pomogli stotinama kupaca da pronađu vozilo koje odgovara njihovim
              potrebama i budžetu. Ne prodajemo najviše, prodajemo vozila u koja verujemo.
            </p>
            <p>
              Svako vozilo prolazi proveru dokumentacije, kilometraže i osnovnih mehaničkih sistema.
              Ono što ne bismo kupili za sebe, nećemo ponuditi ni vama.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/vozila"
              className={buttonVariants({
                size: "lg",
                className:
                  "border-0 bg-[#1D6369] text-white shadow-[0_0_20px_rgba(29,99,105,0.3)] transition-all duration-300 hover:bg-[#2A8C94] hover:shadow-[0_0_30px_rgba(42,140,148,0.4)]",
              })}
            >
              Pogledajte ponudu
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              to="/kontakt"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-white/20 bg-transparent text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10",
              })}
            >
              Posetite nas
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-2xl border border-[#1D6369]/30 bg-gradient-to-br from-[#22252A] to-[#181A1E] p-2 shadow-[0_0_40px_rgba(29,99,105,0.12)]">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={`${import.meta.env.BASE_URL}images/hero-dealership.jpg`}
              alt="Auto kuća Zaječar, izložbeni prostor"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#181A1E]/85 via-[#181A1E]/20 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[#1D6369]/25 via-transparent to-transparent"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-[#181A1E]/85 px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2A8C94]">
              Od {dealership.foundedYear}. godine
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Proverena vozila i fer odnos prema svakom kupcu.
            </p>
          </div>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group min-w-0 rounded-2xl border border-white/10 bg-[#22252A]/60 p-5 transition-all duration-300 hover:border-[#1D6369]/50 hover:bg-[#22252A]/80 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <dt className="text-xs font-medium leading-snug text-gray-400 sm:text-sm">
                {stat.label}
              </dt>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#1D6369]/30 bg-[#1D6369]/15 text-[#2A8C94] transition-colors duration-300 group-hover:bg-[#1D6369]/25">
                <stat.icon aria-hidden="true" className="size-4" />
              </span>
            </div>
            <dd className="mt-3 whitespace-nowrap text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-16" aria-labelledby="values-heading">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2A8C94]">
            Naš pristup
          </p>
          <h2
            id="values-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Naše vrednosti
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
            Četiri stvari na kojima gradimo svaki odnos: od prvog poziva do preuzimanja ključeva.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="group relative rounded-2xl border border-white/10 bg-[#22252A]/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1D6369]/50 hover:bg-[#22252A]/80 hover:shadow-[0_0_30px_rgba(29,99,105,0.12)]"
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-[#1D6369]/30 bg-[#1D6369]/15 text-[#2A8C94] transition-colors duration-300 group-hover:bg-[#1D6369]/25 group-hover:border-[#1D6369]/50">
                <value.icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="visit-heading">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#22252A] to-[#1E2025] p-8 shadow-[0_0_40px_rgba(29,99,105,0.08)] sm:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#1D6369]/5 via-transparent to-[#2A8C94]/5"
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2A8C94]">
                Dođite u posetu
              </p>
              <h2
                id="visit-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Dođite na kafu i pogledajte vozila
              </h2>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-gray-400 sm:text-base">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#2A8C94]" />
                <span>
                  {dealership.street}, {dealership.postalCode} {dealership.city}. Radimo svakog
                  dana osim nedelje.
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={dealership.phoneHref}
                className={buttonVariants({
                  size: "lg",
                  className:
                    "border-0 bg-[#1D6369] text-white shadow-[0_0_20px_rgba(29,99,105,0.3)] transition-all duration-300 hover:bg-[#2A8C94] hover:shadow-[0_0_30px_rgba(42,140,148,0.4)]",
                })}
              >
                <Phone aria-hidden="true" />
                {dealership.phone}
              </a>
              <Link
                to="/kontakt"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "border-white/20 bg-transparent text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10",
                })}
              >
                Kontaktirajte nas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}