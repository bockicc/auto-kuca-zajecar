import * as React from "react";

import { cn } from "@/lib/utils";

function Carousel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel" className={cn(className)} {...props} />;
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel-content" className={cn(className)} {...props} />;
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel-item" className={cn(className)} {...props} />;
}

function CarouselPrevious({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel-previous" className={cn(className)} {...props} />;
}

function CarouselNext({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel-next" className={cn(className)} {...props} />;
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
