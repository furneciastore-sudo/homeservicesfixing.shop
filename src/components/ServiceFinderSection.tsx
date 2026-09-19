import { ZipChecker } from "@/components/ZipChecker";

export function ServiceFinderSection() {
  return (
    <section
      id="service-finder"
      className="relative isolate scroll-mt-20 overflow-hidden bg-primary py-16 sm:py-24"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 72px)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find Home Service Help Near You
          </h2>
          <p className="mt-4 max-w-lg text-white/75">
            Coverage differs by service and by ZIP code. Enter yours below to
            see what&apos;s available before you call.
          </p>
        </div>
        <div id="service-areas" className="scroll-mt-20">
          <ZipChecker location="homepage-finder" />
        </div>
      </div>
    </section>
  );
}
