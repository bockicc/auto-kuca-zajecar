import * as React from "react";

import { cn } from "@/lib/utils";

function ToggleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="toggle-group" className={cn(className)} {...props} />;
}

function ToggleGroupItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="toggle-group-item" className={cn(className)} {...props} />;
}

export { ToggleGroup, ToggleGroupItem };
