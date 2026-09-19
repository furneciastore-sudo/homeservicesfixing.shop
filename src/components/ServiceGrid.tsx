import { ServiceVisual } from "@/components/ServiceVisual";
import { TrackedLink } from "@/components/TrackedLink";
import { SERVICE_LIST } from "@/config/services";
import { getCoverageCount } from "@/lib/coverage";

const CAPTIONS: Record<string, string> = {
  hvac: "HVAC technician servicing an indoor AC unit",
  plumbing: "Plumber repairing a residential water heater",
  electrician: "Electrician working on a home electrical panel",
  "appliance-repair": "Technician repairing a kitchen appliance",
  roofing: "Roofer inspecting a residential roof",
  locksmith: "Locksmith working on a home entry lock",
  "garage-door-repair": "Technician repairing a garage door mechanism",
};

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
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <ServiceVisual
              service={service.slug}
              caption={CAPTIONS[service.slug]}
              className="aspect-[16/10] w-full"
            />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-primary">
                {service.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                {service.description}
              </p>
              <p className="mt-2 text-xs font-medium text-muted">
                Available in {getCoverageCount(service.slug).toLocaleString()}{" "}
                ZIP codes
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
                Find Service
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
