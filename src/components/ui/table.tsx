import * as React from "react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table" className={cn(className)} {...props} />;
}

function TableHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-header" className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-footer" className={cn(className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-head" className={cn(className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-row" className={cn(className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-cell" className={cn(className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="table-caption" className={cn(className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
