import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  label?: string;
  className?: string;
}

export function Spinner({ label = "Učitavanje…", className }: SpinnerProps) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-2", className)}>
      <Loader2 aria-hidden="true" className="size-5 animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
