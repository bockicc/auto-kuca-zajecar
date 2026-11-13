import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatMileage, formatPrice } from "@/lib/utils";

import { useSearch } from "./use-search";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const { query, setQuery, results } = useSearch();
  const navigate = useNavigate();
  const normalizedQuery = query.trim();

  function showAllResults() {
    onClose();
    navigate({ to: "/vozila", search: { q: normalizedQuery || undefined } });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Pretraga vozila"
      description="Pretražite po marki, modelu, godištu ili boji."
      size="lg"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="npr. Golf, 2020, automatik…"
            aria-label="Pretraga vozila"
            autoFocus
            className="pl-10"
          />
        </div>

        {normalizedQuery ? (
          results.length > 0 ? (
            <ul className="divide-y divide-border rounded-sm border border-border">
              {results.map((vehicle) => (
                <li key={vehicle.id}>
                  <Link
                    to="/vozila/$slug"
                    params={{ slug: vehicle.slug }}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                  >
                    <img
                      src={vehicle.images[0]?.src ?? "/images/vehicles/volkswagen-golf-2019.jpg"}
                      alt=""
                      width={80}
                      height={60}
                      className="h-12 w-16 rounded-sm object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {vehicle.brand} {vehicle.model}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {vehicle.year} · {formatMileage(vehicle.mileage)}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-price">
                      {formatPrice(vehicle.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-sm bg-surface-elevated p-4 text-sm text-muted-foreground">
              Nema rezultata za „{normalizedQuery}”. Pokušajte sa drugim pojmom ili pogledajte sva
              vozila.
            </p>
          )
        ) : (
          <p className="text-sm text-muted-foreground">
            Unesite pojam za pretragu. Možete pretraživati i po godištu, gorivu ili boji.
          </p>
        )}

        <div className="flex justify-end border-t border-border pt-4">
          <Button variant="secondary" onClick={showAllResults}>
            Prikaži sve rezultate
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
