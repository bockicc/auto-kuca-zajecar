import * as React from "react";

import { cn } from "@/lib/utils";

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  formatValue = String,
  className,
}: RangeSliderProps) {
  const [low, high] = value;
  const span = Math.max(max - min, 1);
  const lowPercent = ((low - min) / span) * 100;
  const highPercent = ((high - min) / span) * 100;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground tabular">
          {formatValue(low)}–{formatValue(high)}
        </span>
      </div>
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-surface-elevated" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent"
          style={{ left: `${lowPercent}%`, width: `${Math.max(highPercent - lowPercent, 0)}%` }}
        />
        <input
          type="range"
          className="range-input"
          min={min}
          max={max}
          step={step}
          value={low}
          aria-label={`${label}, najniža vrednost`}
          aria-valuetext={formatValue(low)}
          onChange={(event) => onChange([Math.min(Number(event.target.value), high), high])}
        />
        <input
          type="range"
          className="range-input"
          min={min}
          max={max}
          step={step}
          value={high}
          aria-label={`${label}, najviša vrednost`}
          aria-valuetext={formatValue(high)}
          onChange={(event) => onChange([low, Math.max(Number(event.target.value), low)])}
        />
      </div>
    </div>
  );
}
