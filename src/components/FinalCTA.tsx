import { TrackedAnchor } from "@/components/TrackedAnchor";

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-gradient-to-br from-primary to-primary-dark py-16 text-center sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Looking for help with your home?
        </h2>
        <p className="mt-4 text-white/75">
          Check your ZIP code and get connected to the right service, fast.
        </p>
        <TrackedAnchor
          href="#service-finder"
          event="cta_click"
          payload={{ location: "final-cta", label: "check-your-area" }}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-accent-dark"
        >
          Check Your Area
        </TrackedAnchor>
      </div>
    </section>
  );
}
