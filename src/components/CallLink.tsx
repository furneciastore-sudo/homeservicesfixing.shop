"use client";

import type { PhoneNumber } from "@/config/phoneNumbers";
import { trackCallClick } from "@/lib/analytics";

type CallLinkProps = {
  phone: PhoneNumber;
  service: string;
  location: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Every phone CTA on the site should render through this component: it
 * guarantees a real tel: href (opens the device dialer immediately, no
 * intermediate page) and fires the call_click analytics event consistently.
 */
export function CallLink({
  phone,
  service,
  location,
  children,
  className,
}: CallLinkProps) {
  return (
    <a
      href={phone.tel}
      className={className}
      onClick={() =>
        trackCallClick({ service, phone: phone.e164, location })
      }
    >
      {children}
    </a>
  );
}
