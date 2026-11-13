import * as React from "react";

import { cn } from "@/lib/utils";

function Popover({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover" className={cn(className)} {...props} />;
}

function PopoverTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-trigger" className={cn(className)} {...props} />;
}

function PopoverContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-content" className={cn(className)} {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent };
