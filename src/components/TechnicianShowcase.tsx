import { ServiceVisual } from "@/components/ServiceVisual";

const FEATURED = [
  { service: "hvac" as const, caption: "HVAC technician servicing an indoor AC unit" },
  { service: "plumbing" as const, caption: "Plumber repairing a residential water heater" },
  { service: "electrician" as const, caption: "Electrician working on a home electrical panel" },
];

export function TechnicianShowcase() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Real Home Service Work
          </h2>
          <p className="mt-3 text-white/70">
            Trades handling the work homeowners actually call about.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {FEATURED.map((item) => (
            <ServiceVisual
              key={item.service}
              service={item.service}
              caption={item.caption}
              className="aspect-[4/5] w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
