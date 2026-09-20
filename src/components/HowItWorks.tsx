import { CallNowMenu } from "@/components/CallNowMenu";

const STEPS = [
  {
    number: "01",
    title: "Choose Your Service",
    description:
      "Select HVAC, plumbing, electrical, or another home-service category.",
  },
  {
    number: "02",
    title: "Check Your Area",
    description:
      "Enter your ZIP code to see whether that service is currently listed near you.",
  },
  {
    number: "03",
    title: "Call Directly",
    description:
      "Call the appropriate service number from your phone — no forms, no waiting.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            How It Works
          </h2>
        </div>

        <ol className="relative mt-14 space-y-14 border-l-2 border-border pl-8 sm:pl-10">
          {STEPS.map((step) => (
            <li key={step.number} className="relative">
              <span className="absolute -left-[3.05rem] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white sm:-left-[3.55rem] sm:h-10 sm:w-10">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-primary sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-md text-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <CallNowMenu
            location="how-it-works"
            buttonClassName="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-bold text-white shadow-md transition hover:bg-accent-dark"
          />
        </div>
      </div>
    </section>
  );
}
