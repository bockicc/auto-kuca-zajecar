import * as React from "react";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="radio-group" className={cn(className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="radio-group-item" className={cn(className)} {...props} />;
}

export { RadioGroup, RadioGroupItem };
