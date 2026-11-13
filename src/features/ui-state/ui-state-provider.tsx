import * as React from "react";

import type { Vehicle } from "@/types";

interface UiStateContextValue {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isTestDriveOpen: boolean;
  testDriveVehicle: Vehicle | null;
  openTestDrive: (vehicle?: Vehicle) => void;
  closeTestDrive: () => void;
  isInquiryOpen: boolean;
  inquiryVehicle: Vehicle | null;
  openInquiry: (vehicle?: Vehicle) => void;
  closeInquiry: () => void;
}

const UiStateContext = React.createContext<UiStateContextValue | null>(null);

export function UiStateProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const [isTestDriveOpen, setTestDriveOpen] = React.useState(false);
  const [testDriveVehicle, setTestDriveVehicle] = React.useState<Vehicle | null>(null);
  const [isInquiryOpen, setInquiryOpen] = React.useState(false);
  const [inquiryVehicle, setInquiryVehicle] = React.useState<Vehicle | null>(null);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = React.useMemo<UiStateContextValue>(
    () => ({
      isSearchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      isTestDriveOpen,
      testDriveVehicle,
      openTestDrive: (vehicle) => {
        setTestDriveVehicle(vehicle ?? null);
        setTestDriveOpen(true);
      },
      closeTestDrive: () => {
        setTestDriveOpen(false);
        setTestDriveVehicle(null);
      },
      isInquiryOpen,
      inquiryVehicle,
      openInquiry: (vehicle) => {
        setInquiryVehicle(vehicle ?? null);
        setInquiryOpen(true);
      },
      closeInquiry: () => {
        setInquiryOpen(false);
        setInquiryVehicle(null);
      },
    }),
    [isSearchOpen, isTestDriveOpen, testDriveVehicle, isInquiryOpen, inquiryVehicle],
  );

  return <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>;
}

export function useUiState() {
  const context = React.useContext(UiStateContext);
  if (!context) throw new Error("useUiState mora biti unutar UiStateProvider.");

  return context;
}
