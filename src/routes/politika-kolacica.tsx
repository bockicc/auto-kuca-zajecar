import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, cookiePolicy } from "@/features/legal";
import { buildSeo, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/politika-kolacica")({
  component: CookiesPage,
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "Politika kolačića | Auto kuća Zaječar",
          description: cookiePolicy.description,
          path: "/politika-kolacica",
        }),
      ),
    }),
});

function CookiesPage() {
  return <LegalPage document={cookiePolicy} />;
}
