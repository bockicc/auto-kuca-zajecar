import * as React from "react";

import { cn } from "@/lib/utils";

function Form({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form" className={cn(className)} {...props} />;
}

function FormField({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-field" className={cn(className)} {...props} />;
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-item" className={cn(className)} {...props} />;
}

function FormLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-label" className={cn(className)} {...props} />;
}

function FormControl({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-control" className={cn(className)} {...props} />;
}

function FormDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-description" className={cn(className)} {...props} />;
}

function FormMessage({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-message" className={cn(className)} {...props} />;
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
