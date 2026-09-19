import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallLink } from "@/components/CallLink";
import { ZipChecker } from "@/components/ZipChecker";
import { getService, hasPhone, type ServiceSlug } from "@/config/services";
import { getCities, getStateName, getZips, stateSlugToAbbr } from "@/lib/coverage";

export function generateServiceStateMetadata(
  slug: ServiceSlug,
  stateSlug: string,
): Metadata {
  const service = getService(slug)!;
  const abbr = stateSlugToAbbr(stateSlug);
  const stateName = abbr ? getStateName(abbr) : stateSlug;
  const title = `${service.name} in ${stateName} | HomeServicesFixing.shop`;
  const description = `Check ${service.name.toLowerCase()} availability by ZIP code in ${stateName}, and call directly when it's listed in your area.`;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}/${stateSlug}` },
  };
}

export function ServiceStatePage({
  slug,
  stateSlug,
}: {
  slug: ServiceSlug;
  stateSlug: string;
}) {
  const service = getService(slug);
  const abbr = stateSlugToAbbr(stateSlug);
  if (!service || !abbr) notFound();

  const cities = getCities(slug, abbr);
  const zipCount = getZips(slug, abbr).length;
  if (cities.length === 0) notFound();

  const stateName = getStateName(abbr);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-white to-background">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${slug}`} className="hover:text-primary">
              {service.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{stateName}</span>
          </nav>

          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            {service.name} in {stateName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            {service.name} is currently listed in {zipCount.toLocaleString()}{" "}
            ZIP codes across {cities.length} cities in {stateName}. Enter
            your ZIP code below to confirm coverage for your address.
          </p>

          {hasPhone(service) && (
            <CallLink
              phone={service.phone}
              service={service.slug}
              location={`${service.slug}-state-hero`}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-accent-dark"
            >
              {service.callLabel} · {service.phone.display}
            </CallLink>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-primary">
          Check Your {stateName} ZIP Code
        </h2>
        <div className="mt-4">
          <ZipChecker fixedService={slug} location={`${slug}-state-page`} />
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-primary">
            Cities Covered in {stateName}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((c) => (
              <span
                key={c.city}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-text"
              >
                {c.city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
        <Link
          href={`/${slug}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Back to all {service.name} service areas
        </Link>
      </section>
    </>
  );
}
