import { CallLink } from "@/components/CallLink";
import { ServiceVisual } from "@/components/ServiceVisual";
import { TrackedLink } from "@/components/TrackedLink";
import { SERVICE_PHOTO_CAPTIONS } from "@/config/serviceImages";
import { hasPhone, type ServiceSlug, SERVICES } from "@/config/services";

/** Alternating image/text editorial section, used to spotlight a few key services on the homepage. */
export function ServiceStorySection({
  service,
  imageSide,
  heading,
}: {
  service: ServiceSlug;
  imageSide: "left" | "right";
  heading: string;
}) {
  const config = SERVICES[service];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className={imageSide === "right" ? "lg:order-2" : ""}>
          <ServiceVisual
            service={service}
            caption={SERVICE_PHOTO_CAPTIONS[service]}
            className="aspect-[4/3] w-full rounded-2xl shadow-md"
          />
        </div>

        <div className={imageSide === "right" ? "lg:order-1" : ""}>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            {config.shortName}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-md text-muted">{config.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              href={`/${service}#check-zip`}
              event="cta_click"
              payload={{ location: "service-story", service }}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Check {config.shortName} Availability
            </TrackedLink>

            {hasPhone(config) && (
              <CallLink
                phone={config.phone}
                service={config.slug}
                location="service-story"
                className="inline-flex items-center justify-center rounded-lg border-2 border-accent px-5 py-2.5 text-sm font-bold text-accent transition hover:bg-accent hover:text-white"
              >
                {config.callLabel}
              </CallLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
