import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUiState } from "@/features/ui-state";

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  const { openInquiry } = useUiState();

  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-surface px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-surface-elevated text-muted-foreground">
        <SearchX aria-hidden="true" className="size-7" />
      </span>
      <h2 className="mt-4 text-xl font-semibold">Nema rezultata</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Nijedno vozilo trenutno ne odgovara izabranim filterima. Pokušajte sa širim kriterijumima
        ili nam se javite, često imamo vozila koja još nisu objavljena.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasFilters ? (
          <Button variant="outline" onClick={onClearFilters}>
            Obriši filtere
          </Button>
        ) : null}
        <Button onClick={() => openInquiry()}>Pošaljite upit</Button>
      </div>
    </div>
  );
}
