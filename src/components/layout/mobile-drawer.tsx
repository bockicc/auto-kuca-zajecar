import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { MainNav } from "./main-nav";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Meni"
      size="sm"
      className="ml-auto mr-0 h-dvh max-h-dvh w-full max-w-[22rem] rounded-none border-y-0 border-r-0 border-l border-white/10 bg-[#181A1E] p-0"
      headerClassName="border-white/10 px-6 py-5"
      bodyClassName="p-0"
      footerClassName="border-white/10 p-0"
      footer={
        <div className="w-full px-6 pb-8 pt-4">
          <Link
            to="/kontakt"
            onClick={onClose}
            className={cn(
              buttonVariants(),
              "h-12 w-full rounded-xl bg-[#1D6369] text-base font-semibold text-white hover:bg-[#2A8C94]",
            )}
          >
            Zakaži probnu vožnju
          </Link>
        </div>
      }
    >
      <div className="flex h-full flex-col px-4 py-4 sm:px-6">
        <MainNav orientation="vertical" onNavigate={onClose} className="flex-1" />
      </div>
    </Dialog>
  );
}
