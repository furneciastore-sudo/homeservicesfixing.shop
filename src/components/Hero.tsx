import { CallNowMenu } from "@/components/CallNowMenu";
import { ServiceVisual } from "@/components/ServiceVisual";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { SERVICE_PHOTO_CAPTIONS } from "@/config/serviceImages";

export function Hero() {
  return (
    <section className="border-b border-border bg-white lg:grid lg:grid-cols-2 lg:items-stretch">
      <div className="mx-auto flex max-w-xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:mx-0 lg:max-w-none lg:py-24 lg:pl-8 lg:pr-12 xl:pl-16">
        <div className="animate-fade-in-up">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
            Serving homeowners across the USA
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-primary leading-[1.05] sm:text-6xl">
            Home Service Help When You Need It
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Find service professionals for HVAC, plumbing, electrical, and
            other home-service needs in your area.
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
      </div>

      <div className="relative h-72 sm:h-96 lg:h-auto">
        <ServiceVisual
          service="hvac"
          caption={SERVICE_PHOTO_CAPTIONS.hvac}
          variant="hero"
          priority
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
