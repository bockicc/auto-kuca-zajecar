import { captureError } from "./error-capture";

export function reportError(error: unknown) {
  captureError(error);
}
