const STEPS = [
  {
    number: "01",
    title: "Choose Your Service",
    description:
      "Pick from HVAC, plumbing, electrical, appliance, roofing, locksmith, or garage door.",
  },
  {
    number: "02",
    title: "Check Your Area",
    description:
      "Enter your ZIP code to see whether that service is currently listed near you.",
  },
  {
    number: "03",
    title: "Call for Service Help",
    description:
      "Tap Call Now to dial directly from your phone — no forms, no waiting.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            How It Works
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative text-center sm:text-left">
              <span className="text-5xl font-black text-border">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-bold text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1rem] top-6 hidden text-2xl text-border sm:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
