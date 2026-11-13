import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check, ShieldCheck } from "lucide-react";

import { Breadcrumbs } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PriceBox, SpecTable, VehicleGallery, VehicleGrid } from "@/features/inventory";
import { getSimilarVehicles, getVehicleBySlug } from "@/lib/data";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildSeo,
  buildVehicleJsonLd,
  JsonLd,
  toMetaTags,
} from "@/lib/seo";
import type { Vehicle } from "@/types";
import { CONDITION_LABELS, STATUS_LABELS } from "@/types";

export const Route = createFileRoute("/vozila/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicleBySlug(params.slug);

    if (!vehicle) throw notFound();

    return { vehicle };
  },
  component: VehicleDetailPage,
  head: ({ loaderData }) => {
    const vehicle = loaderData?.vehicle;
    const path = vehicle ? `/vozila/${vehicle.slug}` : "/vozila";
    const title = vehicle
      ? `${vehicle.brand} ${vehicle.model} ${vehicle.year} | Auto kuća Zaječar`
      : "Vozilo | Auto kuća Zaječar";
    const description = vehicle
      ? `${vehicle.brand} ${vehicle.model} ${vehicle.variant ?? ""}, ${vehicle.year}, ${vehicle.mileage.toLocaleString("sr-Latn-RS")} km. ${vehicle.description}`
      : "Detalji vozila iz ponude Auto kuće Zaječar.";

    return {
      meta: toMetaTags(
        buildSeo({
          title,
          description,
          path,
          image: vehicle?.images[0]?.src,
          type: "article",
        }),
      ),
      links: [{ rel: "canonical", href: absoluteUrl(path) }],
    };
  },
});

const statusVariant = {
  available: "success",
  reserved: "warning",
  sold: "danger",
} as const;

function VehicleDetailPage() {
  const { vehicle } = Route.useLoaderData() as { vehicle: Vehicle };
  const similar = getSimilarVehicles(vehicle, 3);
  const title = `${vehicle.brand} ${vehicle.model}`;

  return (
    <div className="container-page py-8">
      <JsonLd data={buildVehicleJsonLd(vehicle)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Početna", path: "/" },
          { name: "Vozila", path: "/vozila" },
          { name: title, path: `/vozila/${vehicle.slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Početna", to: "/" },
          { label: "Vozila", to: "/vozila" },
          { label: title },
        ]}
      />

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant[vehicle.status]}>{STATUS_LABELS[vehicle.status]}</Badge>
            <Badge variant="outline">{CONDITION_LABELS[vehicle.condition]}</Badge>
            {vehicle.featured ? <Badge variant="brand">Izdvojeno</Badge> : null}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
            {vehicle.variant ? (
              <span className="block text-lg font-normal text-muted-foreground sm:text-xl">
                {vehicle.variant}
              </span>
            ) : null}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {vehicle.year} · {vehicle.mileage.toLocaleString("sr-Latn-RS")} km · {vehicle.color}
          </p>
        </div>
        <Link to="/vozila" className={buttonVariants({ variant: "outline", size: "sm" })}>
          Nazad na ponudu
        </Link>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-10">
          <VehicleGallery images={vehicle.images} title={title} />

          <section aria-labelledby="description-heading">
            <h2 id="description-heading" className="text-xl font-semibold">
              Opis vozila
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">{vehicle.description}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-surface-elevated px-3 py-2 text-sm text-muted-foreground">
              <ShieldCheck aria-hidden="true" className="size-4 text-brand" />
              Provereno poreklo i dokumentacija. Detalje vam pokazujemo pre kupovine.
            </p>
          </section>

          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-xl font-semibold">
              Oprema
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {vehicle.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check aria-hidden="true" className="size-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <SpecTable vehicle={vehicle} />
        </div>

        <div>
          <PriceBox vehicle={vehicle} />
        </div>
      </div>

      {similar.length > 0 ? (
        <section className="mt-14 border-t border-border pt-10" aria-labelledby="similar-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="similar-heading" className="text-2xl font-bold tracking-tight">
                Slična vozila
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Pogledajte još modela iz naše ponude.
              </p>
            </div>
            <Link to="/vozila" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Sva vozila
            </Link>
          </div>
          <div className="mt-5">
            <VehicleGrid vehicles={similar} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
