import type { FormMeta } from "@/types";
import { getStoredUtm } from "@/lib/analytics";

export function buildFormMeta(sourcePage: string, website?: string): FormMeta {
  const utm = Object.fromEntries(
    Object.entries(getStoredUtm()).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );

  return {
    sourcePage,
    submittedAt: new Date().toISOString(),
    ...(Object.keys(utm).length > 0 ? { utm } : {}),
    ...(website ? { website } : {}),
  };
}
