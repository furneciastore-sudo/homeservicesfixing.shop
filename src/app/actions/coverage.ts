"use server";

import type { ServiceSlug } from "@/config/services";
import { getCoverageRecord, normalizeZip } from "@/lib/coverage";

export type CoverageCheckResult =
  | { status: "invalid" }
  | { status: "available"; city: string; state: string }
  | { status: "unavailable" };

/**
 * Runs server-side so the ~33k-row coverage dataset never ships to the
 * client bundle — the browser only ever sees the single boolean-ish result
 * for the ZIP the visitor actually entered.
 */
export async function checkCoverageAction(
  service: ServiceSlug,
  zipInput: string,
): Promise<CoverageCheckResult> {
  const zip = normalizeZip(zipInput);
  if (!zip) return { status: "invalid" };

  const record = getCoverageRecord(service, zip);
  if (record) {
    return { status: "available", city: record.city, state: record.state };
  }
  return { status: "unavailable" };
}
