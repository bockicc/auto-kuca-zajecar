import { MapPin } from "lucide-react";

import { dealership, mapEmbedUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ContactMapProps {
  heightClassName?: string;
}

export function ContactMap({ heightClassName = "h-[520px]" }: ContactMapProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-white/10",
        heightClassName,
      )}
    >
      <div className="flex items-start gap-2 border-b border-white/10 bg-[#22252A]/60 p-4">
        <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#2A8C94]" />
        <div>
          <p className="font-semibold text-white">{dealership.name}</p>
          <p className="text-sm text-gray-400">
            {dealership.street}, {dealership.postalCode} {dealership.city}
          </p>
        </div>
      </div>
      <iframe
        title={`Mapa: ${dealership.name}`}
        src={mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  );
}