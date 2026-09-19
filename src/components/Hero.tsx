import { CallNowMenu } from "@/components/CallNowMenu";
import { ServiceVisual } from "@/components/ServiceVisual";
import { TrackedAnchor } from "@/components/TrackedAnchor";

export function Hero() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-white to-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="animate-fade-in-up">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
            Serving homeowners across the USA
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Home Service Help, Right When You Need It
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Find service help for HVAC, plumbing, electrical, appliance,
            roofing, locksmith and garage door needs in your area.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedAnchor
              href="#service-finder"
              event="cta_click"
              payload={{ location: "hero", label: "check-your-area" }}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-primary-dark"
            >
              Check Your Area
            </TrackedAnchor>
            <CallNowMenu
              location="hero"
              buttonClassName="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-accent px-6 py-3 text-base font-bold text-accent transition hover:bg-accent hover:text-white"
            />
          </div>

          <p className="mt-6 text-sm text-muted">
            Service availability varies by location — check your ZIP code
            before you call.
          </p>
        </div>

        <ServiceVisual
          service="hvac"
          caption="HVAC technician servicing an indoor AC unit"
          className="aspect-[4/3] w-full shadow-xl lg:aspect-square"
        />
      </div>
    </section>
  );
}
