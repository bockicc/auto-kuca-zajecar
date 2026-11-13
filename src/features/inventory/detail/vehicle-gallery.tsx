import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import * as React from "react";

import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/types";

interface VehicleGalleryProps {
  images: VehicleImage[];
  title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [selected, setSelected] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const current = images[selected] ?? images[0];

  const showPrevious = React.useCallback(() => {
    setSelected((index) => (index - 1 + images.length) % images.length);
  }, [images.length]);

  const showNext = React.useCallback(() => {
    setSelected((index) => (index + 1) % images.length);
  }, [images.length]);

  React.useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, showPrevious, showNext]);

  if (!current) return null;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full overflow-hidden rounded-lg border border-border bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label="Otvori galeriju slika"
      >
        <img
          src={current.src}
          alt={current.alt}
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover"
          fetchPriority="high"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
          <Expand aria-hidden="true" className="size-4" />
          {images.length} {images.length === 1 ? "slika" : "slike"}
        </span>
      </button>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-label={`Prikaži sliku ${index + 1}`}
                aria-current={index === selected ? "true" : undefined}
                className={cn(
                  "block w-full overflow-hidden rounded-sm border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  index === selected ? "border-brand" : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={image.src}
                  alt=""
                  width={200}
                  height={150}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${title}, galerija`}
        size="xl"
      >
        <div className="relative">
          <img
            src={current.src}
            alt={current.alt}
            width={1200}
            height={900}
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
          {images.length > 1 ? (
            <>
              <IconButton
                label="Prethodna slika"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 text-foreground hover:bg-background/95"
              >
                <ChevronLeft aria-hidden="true" />
              </IconButton>
              <IconButton
                label="Sledeća slika"
                onClick={showNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 text-foreground hover:bg-background/95"
              >
                <ChevronRight aria-hidden="true" />
              </IconButton>
            </>
          ) : null}
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {selected + 1} / {images.length}
          </p>
        </div>
      </Dialog>
    </div>
  );
}
