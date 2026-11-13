import * as React from "react";

import { cn } from "@/lib/utils";

function Collapsible({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="collapsible" className={cn(className)} {...props} />;
}

function CollapsibleTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="collapsible-trigger" className={cn(className)} {...props} />;
}

function CollapsibleContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="collapsible-content" className={cn(className)} {...props} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
