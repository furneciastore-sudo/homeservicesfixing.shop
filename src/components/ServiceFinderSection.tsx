import { ZipChecker } from "@/components/ZipChecker";

export function ServiceFinderSection() {
  return (
    <section
      id="service-finder"
      className="scroll-mt-20 bg-primary py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
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
