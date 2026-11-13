import * as React from "react";

import { cn } from "@/lib/utils";

function HoverCard({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="hover-card" className={cn(className)} {...props} />;
}

function HoverCardTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="hover-card-trigger" className={cn(className)} {...props} />;
}

function HoverCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="hover-card-content" className={cn(className)} {...props} />;
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
