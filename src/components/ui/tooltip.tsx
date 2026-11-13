import * as React from "react";

import { cn } from "@/lib/utils";

export interface TooltipProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ label, children, className }: TooltipProps) {
  const id = React.useId();

  return (
    <span className={cn("group relative inline-flex", className)}>
      <span tabIndex={0} aria-describedby={id} className="inline-flex rounded-sm">
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute bottom-full left-1/2 z-widget mb-2 w-max max-w-56 -translate-x-1/2 rounded-sm border border-border bg-surface-elevated px-2 py-1 text-xs text-foreground opacity-0 shadow-card transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
