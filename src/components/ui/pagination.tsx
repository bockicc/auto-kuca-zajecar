import * as React from "react";

import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination" className={cn(className)} {...props} />;
}

function PaginationContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination-content" className={cn(className)} {...props} />;
}

function PaginationItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination-item" className={cn(className)} {...props} />;
}

function PaginationLink({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination-link" className={cn(className)} {...props} />;
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination-previous" className={cn(className)} {...props} />;
}

function PaginationNext({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination-next" className={cn(className)} {...props} />;
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="pagination-ellipsis" className={cn(className)} {...props} />;
}

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis };
