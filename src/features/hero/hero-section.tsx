import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { dealership } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <img
        src="/images/hero-dealership.jpg"
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-background/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="container-page relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
            <BadgeCheck aria-hidden="true" className="size-4 text-brand" />
            Od {dealership.foundedYear}. godine u Zaječaru
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Pravo vozilo.
            <span className="block text-brand">Bez iznenađenja.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            Pažljivo birana polovna i nova vozila, proverenog porekla i jasne istorije. Dođite,
            sedite za volan i uverite se pre nego što odlučite.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/vozila" className={buttonVariants({ size: "lg" })}>
              Pogledajte ponudu
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              to="/kontakt"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-white/20 bg-background/40 backdrop-blur-sm hover:bg-background/60",
              })}
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
