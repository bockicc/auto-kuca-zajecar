import { ChevronLeft, ChevronRight } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);

  return [...pages].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav aria-label="Paginacija" className="flex items-center justify-center gap-2">
      <IconButton
        label="Prethodna stranica"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="border border-border"
      >
        <ChevronLeft aria-hidden="true" />
      </IconButton>

      <ul className="flex items-center gap-1">
        {pages.map((value, index) => {
          const previous = pages[index - 1];
          const showGap = previous !== undefined && value - previous > 1;

          return (
            <li key={value} className="flex items-center gap-1">
              {showGap ? <span className="px-1 text-muted-foreground">…</span> : null}
              <button
                type="button"
                aria-current={value === page ? "page" : undefined}
                aria-label={`Stranica ${value}`}
                onClick={() => onPageChange(value)}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  value === page
                    ? "bg-accent text-accent-contrast"
                    : "border border-border bg-surface hover:bg-surface-elevated",
                )}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>

      <IconButton
        label="Sledeća stranica"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="border border-border"
      >
        <ChevronRight aria-hidden="true" />
      </IconButton>
    </nav>
  );
}
