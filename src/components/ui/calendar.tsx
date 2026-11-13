import * as React from "react";

import { cn } from "@/lib/utils";

function Calendar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="calendar" className={cn(className)} {...props} />;
}

export { Calendar };
