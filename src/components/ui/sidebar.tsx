import * as React from "react";

import { cn } from "@/lib/utils";

function Sidebar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar" className={cn(className)} {...props} />;
}

function SidebarProvider({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-provider" className={cn(className)} {...props} />;
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-trigger" className={cn(className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn(className)} {...props} />;
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn(className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn(className)} {...props} />;
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn(className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-menu" className={cn(className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-menu-item" className={cn(className)} {...props} />;
}

function SidebarMenuButton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-menu-button" className={cn(className)} {...props} />;
}

export { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton };
