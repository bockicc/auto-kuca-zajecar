import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { openingHours } from "@/lib/constants";
import { formatWeekday, getOpenStatus } from "@/lib/utils";

interface OpeningHoursListProps {
  compact?: boolean;
}

export function OpeningHoursList({ compact = false }: OpeningHoursListProps) {
  const status = getOpenStatus(openingHours);
  const today = new Date().getDay();

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Clock aria-hidden="true" className="size-5 text-brand" />
          Radno vreme
        </h3>
        <Badge variant={status.isOpen ? "success" : "outline"}>{status.label}</Badge>
      </div>
      <ul className="space-y-1.5 text-sm">
        {openingHours.map((entry) => {
          const isToday = entry.day === today;

          return (
            <li
              key={entry.day}
              className={
                isToday
                  ? "flex justify-between gap-3 rounded-sm bg-surface-elevated px-2 py-1 font-medium"
                  : "flex justify-between gap-3 px-2 py-1 text-muted-foreground"
              }
            >
              <span className="capitalize">
                {formatWeekday(entry.day)}
                {isToday ? " (danas)" : ""}
              </span>
              <span className="tabular">
                {entry.closed ? "Zatvoreno" : `${entry.open}–${entry.close}`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
