import * as React from "react";

import { cn } from "@/lib/utils";

function Toggle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="toggle" className={cn(className)} {...props} />;
}

export { Toggle };
