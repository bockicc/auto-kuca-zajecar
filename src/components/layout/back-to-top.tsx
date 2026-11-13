import { ArrowUp } from "lucide-react";
import * as React from "react";

import { IconButton } from "@/components/ui/icon-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <IconButton
      label="Nazad na vrh stranice"
      className="fixed bottom-4 left-4 z-widget border border-border bg-surface shadow-card"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
    >
      <ArrowUp aria-hidden="true" />
    </IconButton>
  );
}
