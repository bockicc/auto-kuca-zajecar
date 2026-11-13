import * as React from "react";

import { cn } from "@/lib/utils";

function InputOtp({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp" className={cn(className)} {...props} />;
}

export { InputOtp };
