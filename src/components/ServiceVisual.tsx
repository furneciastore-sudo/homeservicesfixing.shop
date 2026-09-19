import type { ServiceSlug } from "@/config/services";
import { SERVICE_ICONS } from "@/components/icons";

/**
 * Placeholder "photography" panel used everywhere the spec calls for a
 * real action photo (technician working on a system). These are original
 * gradient/illustration art — not stock photos, so there is no licensing
 * risk — but they are a stand-in. To use real photography instead, drop
 * a licensed image at public/images/services/<slug>.jpg and swap the
 * <div> below for a Next.js <Image src={`/images/services/${service}.jpg`} .../>.
 */

const GRADIENTS: Record<ServiceSlug, string> = {
  hvac: "from-sky-900 via-slate-800 to-slate-900",
  plumbing: "from-blue-950 via-slate-800 to-slate-900",
  electrician: "from-amber-900 via-slate-800 to-slate-900",
  "appliance-repair": "from-teal-900 via-slate-800 to-slate-900",
  roofing: "from-stone-800 via-slate-800 to-slate-900",
  locksmith: "from-zinc-800 via-slate-800 to-slate-900",
  "garage-door-repair": "from-neutral-800 via-slate-800 to-slate-900",
};

export function ServiceVisual({
  service,
  caption,
  className = "",
}: {
  service: ServiceSlug;
  caption: string;
  className?: string;
}) {
  const Icon = SERVICE_ICONS[service];
  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl bg-gradient-to-br ${GRADIENTS[service]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 64px)",
        }}
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col items-center justify-center p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur">
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
        <p className="text-xs font-medium uppercase tracking-wide text-white/80">
          {caption}
        </p>
      </div>
    </div>
  );
}
