"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a single analytics event on mount. Renders nothing. */
export function PageViewTracker({
  event,
  payload,
}: {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
}) {
  useEffect(() => {
    trackEvent(event, payload);
    // Only ever run once per mount — payload is static per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
