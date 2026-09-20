import Link from "next/link";
import { SERVICE_LIST } from "@/config/services";
import { getCoverageCount, getStates } from "@/lib/coverage";

export function CoverageStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">
          Service Coverage
        </h2>
        <p className="mt-2 text-sm text-muted">
          Coverage differs by service. See how many ZIP codes and states
          each one currently reaches.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_LIST.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}#service-areas`}
            className="rounded-xl border border-border bg-surface p-4 text-center transition hover:border-primary"
          >
            <p className="text-sm font-bold text-primary">
              {service.shortName}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-text">
              {getCoverageCount(service.slug).toLocaleString()}
            </p>
            <p className="text-xs text-muted">
              ZIP codes · {getStates(service.slug).length} states
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
