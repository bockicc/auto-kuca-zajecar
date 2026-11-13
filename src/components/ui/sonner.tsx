import * as React from "react";

import { cn } from "@/lib/utils";

function Toaster({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="toaster" className={cn(className)} {...props} />;
}

export { Toaster };
