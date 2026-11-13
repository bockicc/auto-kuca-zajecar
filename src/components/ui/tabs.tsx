import * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tabs" className={cn(className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tabs-list" className={cn(className)} {...props} />;
}

function TabsTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tabs-trigger" className={cn(className)} {...props} />;
}

function TabsContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tabs-content" className={cn(className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
