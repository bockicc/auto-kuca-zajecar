import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

import { MainNav } from "./main-nav";
import { MobileDrawer } from "./mobile-drawer";

export function Header() {
  const [isCompact, setCompact] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-sticky border-b border-border bg-background/95 backdrop-blur transition-shadow",
          isCompact ? "shadow-card" : "shadow-none",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-4 transition-[height] duration-200",
            isCompact ? "h-[60px]" : "h-[72px]",
          )}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Auto kuća Zaječar, početna"
          >
            <img
              src="/images/autokucazajecarlogo.png"
              alt="Auto kuća Zaječar"
              width={400}
              height={171}
              className="h-10 w-auto shrink-0 object-contain sm:h-12"
            />
          </Link>

          <MainNav className="hidden lg:block" />

          <div className="flex items-center gap-1">
            <Link
              to="/kontakt"
              className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
            >
              Zakaži probnu vožnju
            </Link>
            <IconButton
              label="Otvori meni"
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </header>
      <MobileDrawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
