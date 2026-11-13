import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FormSuccessProps {
  title: string;
  message: string;
  reference?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function FormSuccess({
  title,
  message,
  reference,
  onReset,
  resetLabel = "Pošaljite novi upit",
}: FormSuccessProps) {
  return (
    <div role="status" className="flex flex-col items-center py-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 aria-hidden="true" className="size-8" />
      </span>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {reference ? (
        <p className="mt-3 rounded-sm bg-surface-elevated px-3 py-1.5 text-xs text-muted-foreground">
          Referenca: <span className="font-mono font-medium text-foreground">{reference}</span>
        </p>
      ) : null}
      {onReset ? (
        <Button variant="outline" className="mt-6" onClick={onReset}>
          {resetLabel}
        </Button>
      ) : null}
    </div>
  );
}
