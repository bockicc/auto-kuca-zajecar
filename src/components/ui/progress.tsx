import * as React from "react";

import { cn } from "@/lib/utils";

function Progress({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="progress" className={cn(className)} {...props} />;
}

export { Progress };
