import { TrackedAnchor } from "@/components/TrackedAnchor";

/**
 * Full-width banner break between major homepage sections. Renders a
 * premium dark gradient today; once a real photo is set at
 * serviceImages.hvac.hero (or another service), swap the div's className
 * for a full-bleed <Image> with this same dark overlay + centered content
 * on top, per the "full-width image break" pattern.
 */
export function FullWidthBreak() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark py-20 text-center sm:py-28">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 72px)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Home Service Help Starts Here
        </h2>
        <TrackedAnchor
          href="#service-finder"
          event="cta_click"
          payload={{ location: "full-width-break", label: "check-your-zip" }}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-accent-dark"
        >
          Check Your ZIP Code
        </TrackedAnchor>
      </div>
    </section>
  );
}
