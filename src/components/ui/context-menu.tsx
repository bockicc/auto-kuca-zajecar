import * as React from "react";

import { cn } from "@/lib/utils";

function ContextMenu({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="context-menu" className={cn(className)} {...props} />;
}

function ContextMenuTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="context-menu-trigger" className={cn(className)} {...props} />;
}

function ContextMenuContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="context-menu-content" className={cn(className)} {...props} />;
}

function ContextMenuItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="context-menu-item" className={cn(className)} {...props} />;
}

function ContextMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="context-menu-separator" className={cn(className)} {...props} />;
}

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator };
