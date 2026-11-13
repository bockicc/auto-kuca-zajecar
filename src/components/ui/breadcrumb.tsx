import * as React from "react";

import { cn } from "@/lib/utils";

function Breadcrumb({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="breadcrumb" className={cn(className)} {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="breadcrumb-list" className={cn(className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="breadcrumb-item" className={cn(className)} {...props} />;
}

function BreadcrumbLink({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="breadcrumb-link" className={cn(className)} {...props} />;
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="breadcrumb-page" className={cn(className)} {...props} />;
}

function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="breadcrumb-separator" className={cn(className)} {...props} />;
}

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator };
