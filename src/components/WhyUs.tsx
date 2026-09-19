import { CheckIcon } from "@/components/icons";

const POINTS = [
  "Find service help for common home repairs across seven trades",
  "Service availability varies by location — check your ZIP code first",
  "Call directly from your phone, with no forms to fill out first",
  "Coverage areas are based on real service-area data, not guesswork",
];

export function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Why Use HomeServicesFixing
          </h2>
          <p className="mt-4 text-muted">
            We built a simple way to find and call home service help —
            without digging through directories or waiting on a callback.
          </p>
        </div>

        <ul className="space-y-4">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-text">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
