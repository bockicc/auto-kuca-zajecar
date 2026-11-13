import { formatNumber } from "@/lib/utils";

interface ResultsSummaryProps {
  total: number;
  page: number;
  pageSize: number;
}

export function ResultsSummary({ total, page, pageSize }: ResultsSummaryProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
      {total === 0
        ? "Nema vozila koja odgovaraju filterima."
        : `Prikazano ${formatNumber(start)}–${formatNumber(end)} od ${formatNumber(total)} vozila`}
    </p>
  );
}
