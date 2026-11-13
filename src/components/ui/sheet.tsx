import * as React from "react";

import { cn } from "@/lib/utils";

function Sheet({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet" className={cn(className)} {...props} />;
}

function SheetTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-trigger" className={cn(className)} {...props} />;
}

function SheetContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-content" className={cn(className)} {...props} />;
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn(className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn(className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-title" className={cn(className)} {...props} />;
}

function SheetDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-description" className={cn(className)} {...props} />;
}

function SheetClose({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-close" className={cn(className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose };
