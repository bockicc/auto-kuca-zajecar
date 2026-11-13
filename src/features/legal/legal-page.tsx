import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

import { Breadcrumbs } from "@/components/layout";
import { useConsent } from "./consent-provider";
import type { LegalDocument } from "./content/privacy";

interface LegalPageProps {
  document: LegalDocument;
}

export function LegalPage({ document }: LegalPageProps) {
  const { openPreferences } = useConsent();
  const isCookiePolicy = document.title.toLocaleLowerCase("sr").includes("kolačić");

  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: "Početna", to: "/" }, { label: document.title }]} />

      <div className="mt-6 max-w-3xl">
        <span className="flex size-11 items-center justify-center rounded-full bg-brand/10 text-brand">
          <FileText aria-hidden="true" className="size-5" />
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{document.title}</h1>
        <p className="mt-3 text-muted-foreground">{document.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Poslednje ažuriranje:{" "}
          {new Date(document.updatedAt).toLocaleDateString("sr-Latn-RS", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {isCookiePolicy ? (
          <button
            type="button"
            onClick={openPreferences}
            className="mt-4 rounded-sm text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Otvorite podešavanja kolačića
          </button>
        ) : null}
      </div>

      <div className="mt-10 max-w-3xl space-y-8">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className="text-xl font-semibold">
              {section.heading}
            </h2>
            <div className="mt-2 space-y-3 text-sm leading-7 text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-1 pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 max-w-3xl rounded-lg border border-border bg-surface p-5 text-sm">
        <p className="font-semibold">Imate pitanje?</p>
        <p className="mt-1 text-muted-foreground">
          Pišite nam na{" "}
          <a href="mailto:info@autokucazajecar.rs" className="text-brand underline">
            info@autokucazajecar.rs
          </a>{" "}
          ili posetite{" "}
          <Link to="/kontakt" className="text-brand underline">
            stranicu za kontakt
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
