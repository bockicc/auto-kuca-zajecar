import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { IconButton } from "./icon-button";

type DialogSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: DialogSize;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "z-overlay m-auto w-[calc(100%-2rem)] rounded-xl border border-border bg-surface p-0 text-foreground shadow-overlay backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-sm",
        sizeClasses[size],
        className,
      )}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b border-border p-5",
            headerClassName,
          )}
        >
          <div className="space-y-1">
            <h2 id={titleId} className="text-xl font-semibold leading-tight">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <IconButton label="Zatvori dijalog" onClick={onClose} className="-mr-2 -mt-1">
            <X aria-hidden="true" />
          </IconButton>
        </div>
        <div className={cn("flex-1 overflow-y-auto p-5", bodyClassName)}>{children}</div>
        {footer ? (
          <div
            className={cn(
              "flex flex-wrap items-center justify-end gap-3 border-t border-border p-5",
              footerClassName,
            )}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
