import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, termsOfUse } from "@/features/legal";
import { buildSeo, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/uslovi-koriscenja")({
  component: TermsPage,
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "Uslovi korišćenja | Auto kuća Zaječar",
          description: termsOfUse.description,
          path: "/uslovi-koriscenja",
        }),
      ),
    }),
});

function TermsPage() {
  return <LegalPage document={termsOfUse} />;
}
