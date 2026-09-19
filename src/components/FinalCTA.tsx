import { CallNowMenu } from "@/components/CallNowMenu";
import { TrackedAnchor } from "@/components/TrackedAnchor";

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-gradient-to-br from-primary to-primary-dark py-16 text-center sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Need Home Service Help?
        </h2>
        <p className="mt-4 text-white/75">
          Check your area and call directly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedAnchor
            href="#service-finder"
            event="cta_click"
            payload={{ location: "final-cta", label: "check-your-area" }}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-accent-dark"
          >
            Check Your Area
          </TrackedAnchor>
          <CallNowMenu
            location="final-cta"
            buttonClassName="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white/40 px-8 py-3.5 text-base font-bold text-white transition hover:bg-white/10"
          />
        </div>
      </div>
    </section>
  );
}
