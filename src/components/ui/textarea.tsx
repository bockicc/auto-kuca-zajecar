import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, hasError = false, showCount = false, maxLength, value, ...props },
  ref,
) {
  const length = typeof value === "string" ? value.length : 0;

  return (
    <div className="space-y-1">
      <textarea
        ref={ref}
        maxLength={maxLength}
        value={value}
        aria-invalid={hasError || undefined}
        className={cn(
          "min-h-32 w-full resize-y rounded-sm border border-border bg-surface px-3 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60",
          hasError && "border-destructive",
          className,
        )}
        {...props}
      />
      {showCount && maxLength ? (
        <p className="text-right text-xs text-muted-foreground tabular" aria-hidden="true">
          {length}/{maxLength}
        </p>
      ) : null}
    </div>
  );
});
