import { SERVICE_LIST } from "@/config/services";

export function CommonProblems() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Common Home Service Problems
          </h2>
          <p className="mt-3 text-muted">
            Recognize the issue? Check your area and get connected.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LIST.map((service) => (
            <div
              key={service.slug}
              className="rounded-xl border border-border bg-background p-5"
            >
              <h3 className="text-sm font-bold uppercase tracking-wide text-accent">
                {service.shortName}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-text">
                {service.commonProblems.slice(0, 4).map((problem) => (
                  <li key={problem} className="flex gap-2">
                    <span aria-hidden="true" className="text-muted">
                      •
                    </span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
