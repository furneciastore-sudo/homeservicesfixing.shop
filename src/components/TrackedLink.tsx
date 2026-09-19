"use client";

import Link from "next/link";
import type { Route } from "next";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * A next/link that also fires an analytics event on click. Kept as its own
 * tiny client component (rather than making the whole card grid a client
 * component) so pages that only need this for tracking don't drag in
 * server-only modules like the coverage dataset into the client bundle.
 */
export function TrackedLink({
  href,
  event,
  payload,
  className,
  children,
}: {
  href: Route | string;
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, payload)}
    >
      {children}
    </Link>
  );
}
