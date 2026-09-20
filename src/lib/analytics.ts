/**
 * Thin analytics wrapper. Pushes events to GA4 (gtag), GTM's dataLayer, and
 * Meta Pixel (fbq) when each is present on the page — see
 * components/AnalyticsScripts.tsx for how the scripts are loaded from
 * NEXT_PUBLIC_* env vars. Safe to call even when no analytics tool is
 * configured (all calls are no-ops in that case).
 */

export type AnalyticsEvent =
  | "call_click"
  | "service_selected"
  | "zip_search"
  | "coverage_found"
  | "coverage_not_found"
  | "service_page_view"
  | "cta_click";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });

    window.gtag?.("event", event, payload);

    // Meta Pixel uses its own taxonomy; map the primary conversion, and
    // otherwise send everything through as a custom event for visibility.
    if (event === "call_click") {
      window.fbq?.("track", "Contact", payload);
    } else {
      window.fbq?.("trackCustom", event, payload);
    }
  } catch {
    // Analytics must never break the page.
  }
}

export function trackCallClick(params: {
  service: string;
  phone: string;
  location: string;
}) {
  trackEvent("call_click", params);
}
