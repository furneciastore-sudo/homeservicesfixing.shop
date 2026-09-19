"use client";

import { useState, useTransition } from "react";
import { checkCoverageAction } from "@/app/actions/coverage";
import { CallLink } from "@/components/CallLink";
import { CheckIcon, PinIcon } from "@/components/icons";
import { SERVICE_LIST, hasPhone, type ServiceSlug } from "@/config/services";
import { trackEvent } from "@/lib/analytics";

type Result =
  | { status: "idle" }
  | { status: "invalid" }
  | { status: "available"; city: string; state: string }
  | { status: "unavailable" };

export function ZipChecker({
  fixedService,
  location,
}: {
  /** When set, hides the service picker and always checks this one service. */
  fixedService?: ServiceSlug;
  /** Section name for analytics, e.g. "hero" or "hvac-page". */
  location: string;
}) {
  const [service, setService] = useState<ServiceSlug>(
    fixedService ?? "hvac",
  );
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<Result>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const activeService = SERVICE_LIST.find((s) => s.slug === service)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = zip.trim();

    if (!/^\d{5}$/.test(trimmed)) {
      setResult({ status: "invalid" });
      return;
    }

    trackEvent("zip_search", { service, zip: trimmed, location });

    startTransition(async () => {
      const outcome = await checkCoverageAction(service, trimmed);
      setResult(outcome);
      trackEvent(
        outcome.status === "available" ? "coverage_found" : "coverage_not_found",
        { service, zip: trimmed, location },
      );
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {!fixedService && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
            Select a service
            <select
              value={service}
              onChange={(e) => {
                const next = e.target.value as ServiceSlug;
                setService(next);
                setResult({ status: "idle" });
                trackEvent("service_selected", { service: next, location });
              }}
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-base text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {SERVICE_LIST.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
          Enter your ZIP code
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <PinIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{5}"
                maxLength={5}
                placeholder="e.g. 90210"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setResult({ status: "idle" });
                }}
                aria-label="ZIP code"
                className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-base text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
            >
              {isPending ? "Checking…" : "Check Availability"}
            </button>
          </div>
        </label>
      </form>

      <div className="mt-4" aria-live="polite">
        {result.status === "invalid" && (
          <p className="text-sm font-medium text-red-600">
            Please enter a valid 5-digit ZIP code.
          </p>
        )}

        {result.status === "available" && (
          <div className="flex flex-col gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-success">
              <CheckIcon className="h-5 w-5 shrink-0" />
              {activeService.name} available in {result.city}, {result.state}
            </p>
            {hasPhone(activeService) ? (
              <CallLink
                phone={activeService.phone}
                service={activeService.slug}
                location={location}
                className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-accent-dark"
              >
                {activeService.callLabel} · {activeService.phone.display}
              </CallLink>
            ) : (
              <p className="text-sm text-muted">
                {activeService.name} is available in your area, and phone
                support for this service is coming soon. Check back shortly.
              </p>
            )}
          </div>
        )}

        {result.status === "unavailable" && (
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm font-medium text-text">
              We&apos;re sorry, {activeService.name.toLowerCase()} is not
              currently listed for this ZIP code.
            </p>
            <p className="mt-1 text-sm text-muted">
              Try another ZIP code, or select a different service above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
