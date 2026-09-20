import { ServiceVisual } from "@/components/ServiceVisual";
import { SERVICE_PHOTO_CAPTIONS } from "@/config/serviceImages";

/**
 * Editorial, asymmetric image grid inspired by premium project-portfolio
 * layouts — large "hero" cells paired with smaller supporting shots,
 * rather than a uniform grid of equal-sized tiles.
 */
export function RealWorkGrid() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Real Home Service Work
          </h2>
          <p className="mt-3 text-white/70">
            Professional help for the systems and repairs that keep your
            home running.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:[grid-template-rows:280px_280px]">
          <ServiceVisual
            service="hvac"
            caption={SERVICE_PHOTO_CAPTIONS.hvac}
            className="h-56 rounded-xl sm:col-span-2 sm:row-span-2 sm:h-full"
          />
          <ServiceVisual
            service="plumbing"
            caption={SERVICE_PHOTO_CAPTIONS.plumbing}
            className="h-40 rounded-xl sm:h-full"
          />
          <ServiceVisual
            service="electrician"
            caption={SERVICE_PHOTO_CAPTIONS.electrician}
            className="h-40 rounded-xl sm:h-full"
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:[grid-template-rows:220px]">
          <ServiceVisual
            service="garage-door-repair"
            caption={SERVICE_PHOTO_CAPTIONS["garage-door-repair"]}
            className="h-48 rounded-xl sm:col-span-2 sm:h-full"
          />
          <ServiceVisual
            service="appliance-repair"
            caption={SERVICE_PHOTO_CAPTIONS["appliance-repair"]}
            className="h-40 rounded-xl sm:h-full"
          />
        </div>
      </div>
    </section>
  );
}
