import * as React from "react";

import { cn } from "@/lib/utils";

function Resizable({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="resizable" className={cn(className)} {...props} />;
}

function ResizablePanelGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="resizable-panel-group" className={cn(className)} {...props} />;
}

function ResizablePanel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="resizable-panel" className={cn(className)} {...props} />;
}

function ResizableHandle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="resizable-handle" className={cn(className)} {...props} />;
}

export { Resizable, ResizablePanelGroup, ResizablePanel, ResizableHandle };
