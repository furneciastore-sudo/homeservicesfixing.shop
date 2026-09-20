import { CallLink } from "@/components/CallLink";
import { PhoneIcon } from "@/components/icons";
import { SERVICE_LIST, hasPhone } from "@/config/services";

const CALLABLE_SERVICES = SERVICE_LIST.filter(hasPhone);

/**
 * Site-wide "Call Now" control. There's no single business-wide phone
 * number — each trade has its own line — so this lets the visitor pick the
 * right one instead of guessing and routing them to the wrong service.
 * Uses <details>/<summary> for a dependency-free, keyboard- and
 * screen-reader-accessible disclosure.
 */
export function CallNowMenu({
  location,
  className = "",
  buttonClassName,
  menuPosition = "below",
}: {
  location: string;
  className?: string;
  buttonClassName: string;
  /** "above" opens the dropdown upward — use this near the bottom of the viewport. */
  menuPosition?: "below" | "above";
}) {
  const menuPositionClasses =
    menuPosition === "above" ? "bottom-full right-0 mb-2" : "right-0 mt-2";

  return (
    <details className={`group relative ${className}`}>
      <summary
        className={`${buttonClassName} list-none [&::-webkit-details-marker]:hidden`}
      >
        <PhoneIcon className="h-4 w-4" />
        Call Now
      </summary>
      <div
        className={`absolute z-30 w-64 overflow-hidden rounded-xl border border-border bg-surface shadow-lg ${menuPositionClasses}`}
      >
        <p className="border-b border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Choose a service to call
        </p>
        <ul>
          {CALLABLE_SERVICES.map((service) => (
            <li key={service.slug}>
              <CallLink
                phone={service.phone}
                service={service.slug}
                location={location}
                className="flex items-center justify-between px-4 py-3 text-sm text-text transition hover:bg-background"
              >
                <span className="font-medium">{service.shortName}</span>
                <span className="text-accent font-semibold">
                  {service.phone.display}
                </span>
              </CallLink>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
