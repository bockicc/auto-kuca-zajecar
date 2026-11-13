import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar" className={cn(className)} {...props} />;
}

function AvatarImage({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-image" className={cn(className)} {...props} />;
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-fallback" className={cn(className)} {...props} />;
}

export { Avatar, AvatarImage, AvatarFallback };
