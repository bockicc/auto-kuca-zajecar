import * as React from "react";

import { cn } from "@/lib/utils";

function Drawer({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer" className={cn(className)} {...props} />;
}

function DrawerTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-trigger" className={cn(className)} {...props} />;
}

function DrawerContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-content" className={cn(className)} {...props} />;
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn(className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn(className)} {...props} />;
}

function DrawerTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-title" className={cn(className)} {...props} />;
}

function DrawerDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-description" className={cn(className)} {...props} />;
}

function DrawerClose({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-close" className={cn(className)} {...props} />;
}

export { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose };
