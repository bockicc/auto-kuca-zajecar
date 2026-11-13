import * as React from "react";

import { cn } from "@/lib/utils";

function AlertDialog({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog" className={cn(className)} {...props} />;
}

function AlertDialogTrigger({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-trigger" className={cn(className)} {...props} />;
}

function AlertDialogContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-content" className={cn(className)} {...props} />;
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-header" className={cn(className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-footer" className={cn(className)} {...props} />;
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-title" className={cn(className)} {...props} />;
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-description" className={cn(className)} {...props} />;
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-action" className={cn(className)} {...props} />;
}

function AlertDialogCancel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-cancel" className={cn(className)} {...props} />;
}

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel };
