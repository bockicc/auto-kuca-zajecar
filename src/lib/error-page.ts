export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Došlo je do neočekivane greške.";
}
