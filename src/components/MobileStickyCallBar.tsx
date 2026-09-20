"use client";

import { usePathname } from "next/navigation";
import { CallLink } from "@/components/CallLink";
import { CallNowMenu } from "@/components/CallNowMenu";
import { PhoneIcon } from "@/components/icons";
import { getService, hasPhone } from "@/config/services";

/**
 * Fixed bottom call bar shown only on small screens. On a service page
 * (detected from the URL, e.g. /hvac or /hvac/california) it links
 * straight to that trade's number; everywhere else it opens the service
 * picker so we never guess which line the visitor needs.
 */
export function MobileStickyCallBar() {
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1];
  const service = getService(firstSegment);
  const showDirectCall = service && hasPhone(service);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
      {showDirectCall ? (
        <CallLink
          phone={service.phone}
          service={service.slug}
          location="mobile-sticky-bar"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-base font-bold text-white shadow-md"
        >
          <PhoneIcon className="h-5 w-5" />
          {service.callLabel} — {service.phone.display}
        </CallLink>
      ) : (
        <CallNowMenu
          location="mobile-sticky-bar"
          className="block"
          buttonClassName="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-base font-bold text-white shadow-md"
          menuPosition="above"
        />
      )}
    </div>
  );
}
