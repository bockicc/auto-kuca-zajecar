import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, hasError = false, children, ...props },
  ref,
) {
  return (
    <div className="group relative">
      <select
        ref={ref}
        aria-invalid={hasError || undefined}
        className={cn(
          "h-12 w-full cursor-pointer appearance-none rounded-sm border border-border bg-surface px-3 pr-10 text-base text-foreground transition-colors focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60",
          hasError && "border-destructive",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-brand/70 transition-colors group-hover:text-brand group-focus-within:text-brand"
      />
    </div>
  );
});
