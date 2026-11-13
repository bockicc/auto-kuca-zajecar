import * as React from "react";

import { cn } from "@/lib/utils";

function DropdownMenu({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu" className={cn(className)} {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-trigger" className={cn(className)} {...props} />;
}

function DropdownMenuContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-content" className={cn(className)} {...props} />;
}

function DropdownMenuItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-item" className={cn(className)} {...props} />;
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-separator" className={cn(className)} {...props} />;
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-label" className={cn(className)} {...props} />;
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel };
