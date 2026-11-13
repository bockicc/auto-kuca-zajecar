import * as React from "react";

import { cn } from "@/lib/utils";

function AspectRatio({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="aspect-ratio" className={cn(className)} {...props} />;
}

export { AspectRatio };
