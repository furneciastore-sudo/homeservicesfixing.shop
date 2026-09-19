import Link from "next/link";
import type { Metadata } from "next";
import { CallLink } from "@/components/CallLink";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ServiceVisual } from "@/components/ServiceVisual";
import { ZipChecker } from "@/components/ZipChecker";
import { getService, hasPhone, type ServiceSlug } from "@/config/services";
import {
  getCoverageCount,
  getStateName,
  getStates,
  stateNameToSlug,
} from "@/lib/coverage";

const CAPTIONS: Record<ServiceSlug, string> = {
  hvac: "HVAC technician servicing an indoor AC unit",
  plumbing: "Plumber repairing a residential water heater",
  electrician: "Electrician working on a home electrical panel",
  "appliance-repair": "Technician repairing a kitchen appliance",
  roofing: "Roofer inspecting a residential roof",
  locksmith: "Locksmith working on a home entry lock",
  "garage-door-repair": "Technician repairing a garage door mechanism",
};

export function generateServiceMetadata(slug: ServiceSlug): Metadata {
  const service = getService(slug)!;
  const title = `${service.tagline} | HomeServicesFixing.shop`;
  const description = `${service.description} Check your ZIP code to see if ${service.name.toLowerCase()} is currently listed in your area.`;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title, description, url: `/${slug}` },
  };
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug)!;
  const states = getStates(slug);
  const coverageCount = getCoverageCount(slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    areaServed: states.map((abbr) => getStateName(abbr)),
    provider: {
      "@type": "Organization",
      name: "HomeServicesFixing.shop",
    },
  };

  return (
    <>
      <PageViewTracker event="service_page_view" payload={{ service: slug }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="border-b border-border bg-gradient-to-b from-white to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text">{service.name}</span>
            </nav>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              {service.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              {service.description}
            </p>
            <p className="mt-3 text-sm font-medium text-muted">
              Listed in {coverageCount.toLocaleString()} ZIP codes across{" "}
              {states.length} states.
            </p>

            {hasPhone(service) && (
              <CallLink
                phone={service.phone}
                service={service.slug}
                location={`${service.slug}-hero`}
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-accent-dark"
              >
                {service.callLabel} · {service.phone.display}
              </CallLink>
            )}
          </div>

          <ServiceVisual
            service={slug}
            caption={CAPTIONS[slug]}
            className="aspect-[4/3] w-full shadow-xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {service.name}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-text">
              {service.subservices.map((item) => (
                <li key={item} className="rounded-lg bg-background px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="check-zip" className="scroll-mt-20">
            <h2 className="text-2xl font-bold text-primary">
              Check Your ZIP Code
            </h2>
            <p className="mt-2 text-sm text-muted">
              See if {service.name.toLowerCase()} is currently listed in your
              area.
            </p>
            <div className="mt-4">
              <ZipChecker fixedService={slug} location={`${slug}-page`} />
            </div>
          </div>
        </div>
      </section>

      <CommonProblemsForService slug={slug} />

      {states.length > 0 && (
        <section id="service-areas" className="bg-surface py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-primary">
              {service.name} Service Areas
            </h2>
            <p className="mt-2 text-sm text-muted">
              {service.name} coverage is currently listed in these states.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {states.map((abbr) => (
                <Link
                  key={abbr}
                  href={`/${slug}/${stateNameToSlug(abbr)}`}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary"
                >
                  {getStateName(abbr)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-primary">
          How Getting {service.name} Works
        </h2>
        <ol className="mt-6 space-y-3 text-left text-sm text-text">
          <li>1. Enter your ZIP code above to check availability.</li>
          <li>2. If listed, you&apos;ll see a Call Now button appear.</li>
          <li>3. Tap it to call directly — your phone dials immediately.</li>
        </ol>

        {hasPhone(service) ? (
          <CallLink
            phone={service.phone}
            service={service.slug}
            location={`${service.slug}-bottom-cta`}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-accent-dark"
          >
            {service.callLabel} · {service.phone.display}
          </CallLink>
        ) : (
          <p className="mt-8 text-sm text-muted">
            Phone support for {service.name.toLowerCase()} is coming soon.
          </p>
        )}
      </section>
    </>
  );
}

function CommonProblemsForService({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug)!;
  return (
    <section className="bg-background py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-primary">
          Common {service.name} Problems
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.commonProblems.map((problem) => (
            <li
              key={problem}
              className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text"
            >
              {problem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
