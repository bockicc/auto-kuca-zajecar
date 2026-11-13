import * as React from "react";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="switch" className={cn(className)} {...props} />;
}

export { Switch };
