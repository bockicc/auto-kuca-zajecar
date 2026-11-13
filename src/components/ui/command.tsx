import * as React from "react";

import { cn } from "@/lib/utils";

function Command({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command" className={cn(className)} {...props} />;
}

function CommandInput({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-input" className={cn(className)} {...props} />;
}

function CommandList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-list" className={cn(className)} {...props} />;
}

function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-empty" className={cn(className)} {...props} />;
}

function CommandGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-group" className={cn(className)} {...props} />;
}

function CommandItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-item" className={cn(className)} {...props} />;
}

function CommandSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-separator" className={cn(className)} {...props} />;
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-shortcut" className={cn(className)} {...props} />;
}

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut };
