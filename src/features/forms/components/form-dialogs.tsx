import { Dialog } from "@/components/ui/dialog";
import { useUiState } from "@/features/ui-state";

import { InquiryForm } from "./inquiry-form";
import { TestDriveForm } from "./test-drive-form";

export function FormDialogs() {
  const {
    isTestDriveOpen,
    testDriveVehicle,
    closeTestDrive,
    isInquiryOpen,
    inquiryVehicle,
    closeInquiry,
  } = useUiState();

  return (
    <>
      <Dialog
        open={isTestDriveOpen}
        onClose={closeTestDrive}
        title="Zakažite probnu vožnju"
        description="Popunite podatke i javićemo vam se da potvrdimo termin."
        size="lg"
      >
        {testDriveVehicle ? (
          <TestDriveForm
            vehicle={testDriveVehicle}
            sourcePage={typeof window !== "undefined" ? window.location.pathname : "/"}
          />
        ) : null}
      </Dialog>

      <Dialog
        open={isInquiryOpen}
        onClose={closeInquiry}
        title="Pošaljite upit"
        description="Odgovaramo u toku radnog dana."
        size="lg"
      >
        <InquiryForm
          vehicle={inquiryVehicle ?? undefined}
          sourcePage={typeof window !== "undefined" ? window.location.pathname : "/"}
        />
      </Dialog>
    </>
  );
}
