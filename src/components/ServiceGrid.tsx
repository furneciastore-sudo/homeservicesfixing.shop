import { ServiceVisual } from "@/components/ServiceVisual";
import { TrackedLink } from "@/components/TrackedLink";
import { SERVICE_PHOTO_CAPTIONS } from "@/config/serviceImages";
import { SERVICE_LIST } from "@/config/services";

export function ServiceGrid() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Service Categories
        </h2>
        <p className="mt-3 text-muted">
          Pick a service to see coverage, common problems, and how to get
          connected.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_LIST.map((service) => (
          <TrackedLink
            key={service.slug}
            href={`/${service.slug}`}
            event="service_selected"
            payload={{ service: service.slug, location: "service-grid" }}
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition hover:shadow-xl"
          >
            <ServiceVisual
              service={service.slug}
              caption={SERVICE_PHOTO_CAPTIONS[service.slug]}
              zoomOnHover
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative flex flex-col p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                {service.shortName}
              </span>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                {service.cardTagline}
              </h3>
              <p className="mt-2 text-sm text-white/80">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                Check Availability
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </TrackedLink>
        ))}
      </div>
    </section>
  );
}
