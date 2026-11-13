import { Link } from "@tanstack/react-router";

import { mainNav } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MainNavProps {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
  className?: string;
}

export function MainNav({ orientation = "horizontal", onNavigate, className }: MainNavProps) {
  return (
    <nav aria-label="Glavna navigacija" className={className}>
      <ul
        className={cn(
          "flex",
          orientation === "horizontal" ? "items-center gap-1" : "flex-col gap-2 pt-4",
        )}
      >
        {mainNav.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={onNavigate}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{
                className:
                  orientation === "vertical"
                    ? "bg-[#22252A] text-white"
                    : "text-brand",
              }}
              inactiveProps={{
                className:
                  orientation === "vertical"
                    ? "text-gray-400 hover:text-white hover:bg-[#22252A]/60"
                    : "text-muted-foreground",
              }}
              className={cn(
                "block font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                orientation === "horizontal"
                  ? "rounded-sm px-3 py-2 text-sm hover:text-brand"
                  : "rounded-xl px-4 py-3.5 text-lg tracking-tight",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
