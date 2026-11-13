import * as React from "react";

import { cn } from "@/lib/utils";

function ScrollArea({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="scroll-area" className={cn(className)} {...props} />;
}

function ScrollAreaViewport({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="scroll-area-viewport" className={cn(className)} {...props} />;
}

function ScrollAreaScrollbar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="scroll-area-scrollbar" className={cn(className)} {...props} />;
}

export { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar };
