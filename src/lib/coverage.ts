import type { ServiceSlug } from "@/config/services";

import applianceRepair from "@/data/coverage/appliance-repair.json";
import electrician from "@/data/coverage/electrician.json";
import garageDoorRepair from "@/data/coverage/garage-door-repair.json";
import hvac from "@/data/coverage/hvac.json";
import locksmith from "@/data/coverage/locksmith.json";
import plumbing from "@/data/coverage/plumbing.json";
import roofing from "@/data/coverage/roofing.json";

export type CoverageRecord = {
  zip: string;
  city: string;
  state: string;
};

const RAW_COVERAGE: Record<ServiceSlug, CoverageRecord[]> = {
  hvac,
  plumbing,
  electrician,
  "appliance-repair": applianceRepair,
  roofing,
  locksmith,
  "garage-door-repair": garageDoorRepair,
};

/** Normalizes user input into a 5-digit ZIP string, preserving leading zeros. */
export function normalizeZip(input: string): string | null {
  const digits = input.trim().replace(/\D/g, "");
  if (digits.length !== 5) return null;
  return digits;
}

export function isValidZip(input: string): boolean {
  return normalizeZip(input) !== null;
}

/** All coverage records for a service, in source order. */
export function getServiceAreas(service: ServiceSlug): CoverageRecord[] {
  return RAW_COVERAGE[service] ?? [];
}

/** True if the given service is confirmed available for the given ZIP. */
export function checkCoverage(service: ServiceSlug, zip: string): boolean {
  const normalized = normalizeZip(zip);
  if (!normalized) return false;
  return getServiceAreas(service).some((r) => r.zip === normalized);
}

/** The specific record (city/state) matched for a ZIP, if covered. */
export function getCoverageRecord(
  service: ServiceSlug,
  zip: string,
): CoverageRecord | null {
  const normalized = normalizeZip(zip);
  if (!normalized) return null;
  return getServiceAreas(service).find((r) => r.zip === normalized) ?? null;
}

/** Every service that lists the given ZIP as covered. */
export function getServicesForZip(zip: string): ServiceSlug[] {
  const normalized = normalizeZip(zip);
  if (!normalized) return [];
  return (Object.keys(RAW_COVERAGE) as ServiceSlug[]).filter((service) =>
    RAW_COVERAGE[service].some((r) => r.zip === normalized),
  );
}

/** Distinct, sorted list of states a service covers. */
export function getStates(service: ServiceSlug): string[] {
  const states = new Set(getServiceAreas(service).map((r) => r.state));
  return Array.from(states).sort();
}

/** Distinct, sorted list of cities a service covers, optionally within one state. */
export function getCities(
  service: ServiceSlug,
  state?: string,
): { city: string; state: string }[] {
  const records = getServiceAreas(service).filter(
    (r) => !state || r.state === state.toUpperCase(),
  );
  const seen = new Map<string, { city: string; state: string }>();
  for (const r of records) {
    seen.set(`${r.city}|${r.state}`, { city: r.city, state: r.state });
  }
  return Array.from(seen.values()).sort((a, b) =>
    a.city.localeCompare(b.city),
  );
}

/** All ZIP codes a service covers, optionally narrowed to one state. */
export function getZips(service: ServiceSlug, state?: string): string[] {
  return getServiceAreas(service)
    .filter((r) => !state || r.state === state.toUpperCase())
    .map((r) => r.zip);
}

export function getCoverageCount(service: ServiceSlug): number {
  return getServiceAreas(service).length;
}

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan",
  MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana",
  NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

export function getStateName(abbr: string): string {
  return STATE_NAMES[abbr.toUpperCase()] ?? abbr.toUpperCase();
}

export function stateSlugToAbbr(slug: string): string | null {
  const normalized = slug.trim().toLowerCase().replace(/-/g, " ");
  const entry = Object.entries(STATE_NAMES).find(
    ([, name]) => name.toLowerCase() === normalized,
  );
  return entry ? entry[0] : null;
}

export function stateNameToSlug(abbr: string): string {
  return getStateName(abbr).toLowerCase().replace(/\s+/g, "-");
}
