import * as React from "react";

import { cn } from "@/lib/utils";

function NavigationMenu({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navigation-menu" className={cn(className)} {...props} />;
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navigation-menu-list" className={cn(className)} {...props} />;
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navigation-menu-item" className={cn(className)} {...props} />;
}

function NavigationMenuTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navigation-menu-trigger" className={cn(className)} {...props} />;
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navigation-menu-content" className={cn(className)} {...props} />;
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navigation-menu-link" className={cn(className)} {...props} />;
}

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink };
