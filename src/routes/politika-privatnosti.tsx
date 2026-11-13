import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, privacyPolicy } from "@/features/legal";
import { buildSeo, toMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/politika-privatnosti")({
  component: PrivacyPage,
  head: () =>
    ({
      meta: toMetaTags(
        buildSeo({
          title: "Politika privatnosti | Auto kuća Zaječar",
          description: privacyPolicy.description,
          path: "/politika-privatnosti",
        }),
      ),
    }),
});

function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
