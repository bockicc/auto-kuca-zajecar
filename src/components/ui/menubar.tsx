import * as React from "react";

import { cn } from "@/lib/utils";

function Menubar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar" className={cn(className)} {...props} />;
}

function MenubarMenu({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar-menu" className={cn(className)} {...props} />;
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar-trigger" className={cn(className)} {...props} />;
}

function MenubarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar-content" className={cn(className)} {...props} />;
}

function MenubarItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar-item" className={cn(className)} {...props} />;
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar-separator" className={cn(className)} {...props} />;
}

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator };
