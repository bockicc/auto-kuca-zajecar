import { useId } from "react";

import { Select } from "@/components/ui/select";
import type { VehicleSort } from "@/types";
import { SORT_LABELS } from "@/types";

interface SortControlProps {
  value: VehicleSort;
  onChange: (value: VehicleSort) => void;
}

const sortOptions = Object.entries(SORT_LABELS) as Array<[VehicleSort, string]>;

export function SortControl({ value, onChange }: SortControlProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="whitespace-nowrap text-sm text-muted-foreground">
        Sortiraj:
      </label>
      <Select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as VehicleSort)}
        className="h-10 min-w-48 text-sm"
      >
        {sortOptions.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  );
}
