import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
  onOpenChange?: (openIds: string[]) => void;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className,
  onOpenChange,
}: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(defaultOpenIds);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const baseId = React.useId();

  const validOpenIds = React.useMemo(
    () => Array.from(new Set(openIds.filter((id) => items.some((item) => item.id === id)))),
    [items, openIds],
  );

  React.useEffect(() => {
    if (validOpenIds.length !== openIds.length) {
      setOpenIds(validOpenIds);
    }
  }, [validOpenIds, openIds.length]);

  function toggle(id: string) {
    const isOpen = openIds.includes(id);
    const next = isOpen
      ? openIds.filter((openId) => openId !== id)
      : allowMultiple
        ? [...openIds, id]
        : [id];

    setOpenIds(next);
    onOpenChange?.(next);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const triggers = Array.from(
      containerRef.current?.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]") ?? [],
    );
    const index = triggers.indexOf(event.currentTarget);
    if (index === -1) return;

    event.preventDefault();

    if (event.key === "Home") triggers[0]?.focus();
    if (event.key === "End") triggers[triggers.length - 1]?.focus();
    if (event.key === "ArrowDown") triggers[(index + 1) % triggers.length]?.focus();
    if (event.key === "ArrowUp") triggers[(index - 1 + triggers.length) % triggers.length]?.focus();
  }

  return (
    <div ref={containerRef} className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${baseId}-${item.id}-trigger`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-[#1D6369]/40 bg-[#22252A] shadow-[0_0_30px_rgba(29,99,105,0.12)]"
                : "border-white/10 bg-[#22252A]/60 hover:border-[#1D6369]/30 hover:bg-[#22252A]/80",
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                data-accordion-trigger
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={handleKeyDown}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2A8C94]"
              >
                <span className="pr-4">{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-300 ease-out",
                    isOpen ? "rotate-180 text-[#2A8C94]" : "text-gray-400",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-all duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-300">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}