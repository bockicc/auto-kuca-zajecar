import { Link, createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { FaqSection, faqEntries } from "@/features/faq";
import { buildFaqJsonLd, buildSeo, JsonLd, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "Česta pitanja | Auto kuća Zaječar",
          description:
            "Odgovori na najčešća pitanja o kupovini, probnoj vožnji, garanciji, finansiranju i zameni vozila.",
          path: "/faq",
        }),
      ),
    }),
});

function FaqPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <JsonLd data={buildFaqJsonLd(faqEntries)} />
      <Breadcrumbs items={[{ label: "Početna", to: "/" }, { label: "Česta pitanja" }]} />

      <div className="mt-8 sm:mt-10">
        <FaqSection />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-[#22252A]/60 p-6 text-center sm:mt-14 sm:p-8">
        <h2 className="text-xl font-semibold text-white">Niste pronašli odgovor?</h2>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Pozovite nas ili pošaljite upit, odgovaramo bez obaveze.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/kontakt" className={buttonVariants()}>
            Kontaktirajte nas
          </Link>
          <Link to="/vozila" className={buttonVariants({ variant: "outline" })}>
            Pogledajte vozila
          </Link>
        </div>
      </div>
    </div>
  );
}
