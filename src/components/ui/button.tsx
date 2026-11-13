import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
        secondary:
          "border border-brand/50 bg-transparent text-brand hover:border-brand hover:bg-brand/10",
        outline: "border border-border bg-surface text-foreground hover:bg-surface-elevated",
        ghost: "text-foreground hover:bg-surface-elevated",
        destructive:
          "border border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    isLoading = false,
    loadingLabel = "Učitavanje…",
    children,
    disabled,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-2", isLoading && "invisible")}>
        {children}
      </span>
      {isLoading ? (
        <span className="absolute inset-0 inline-flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" aria-hidden="true" />
          <span>{loadingLabel}</span>
        </span>
      ) : null}
    </button>
  );
});
