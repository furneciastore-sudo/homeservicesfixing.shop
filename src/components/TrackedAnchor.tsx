"use client";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Same idea as TrackedLink, for plain in-page anchors (e.g. "#service-finder"). */
export function TrackedAnchor({
  href,
  event,
  payload,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => trackEvent(event, payload)}>
      {children}
    </a>
  );
}
