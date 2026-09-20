/**
 * Single source of truth for every phone number used on the site.
 * Never hard-code a tel: link anywhere else — import from here instead.
 */

export type PhoneNumber = {
  /** Digits-only E.164 number, e.g. "+18312309683" */
  e164: `+1${string}`;
  /** Human-readable format for display, e.g. "(831) 230-9683" */
  display: string;
  /** Ready-to-use href for <a href={tel}>, e.g. "tel:+18312309683" */
  tel: `tel:+1${string}`;
};

function makePhoneNumber(e164: `+1${string}`, display: string): PhoneNumber {
  return { e164, display, tel: `tel:${e164}` };
}

export const PHONE_NUMBERS = {
  hvac: makePhoneNumber("+18312309683", "(831) 230-9683"),
  plumbing: makePhoneNumber("+16073001044", "(607) 300-1044"),
  electrician: makePhoneNumber("+17257458442", "(725) 745-8442"),
  // Not yet assigned — services stay fully functional without a number
  // (see config/services.ts + hasPhone helper). Add here when available:
  // applianceRepair: makePhoneNumber("+1XXXXXXXXXX", "(XXX) XXX-XXXX"),
} as const;

export type PhoneNumberKey = keyof typeof PHONE_NUMBERS;

/**
 * There is intentionally no single site-wide "primary" number: each phone
 * line belongs to one trade, and routing a plumbing caller to the HVAC line
 * (or vice versa) would be a real customer-experience failure. Site-wide
 * "Call Now" UI (header, sticky bar) should let the visitor pick the right
 * service — see components/CallNowMenu.tsx — rather than defaulting to one
 * number. A service-specific page can safely link straight to its own
 * config/services.ts phone entry.
 */
