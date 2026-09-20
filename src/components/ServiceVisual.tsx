import Image from "next/image";
import type { ServiceSlug } from "@/config/services";
import { SERVICE_ICONS } from "@/components/icons";
import { serviceImages } from "@/config/serviceImages";

/**
 * Renders a real photo when one has been configured in
 * src/config/serviceImages.ts, otherwise falls back to an original
 * gradient/icon placeholder — never a broken image, never a stock photo
 * we don't have the rights to use. Once real photography is added, every
 * usage of this component picks it up automatically.
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
  variant = "card",
  zoomOnHover = false,
  priority = false,
  className = "",
}: {
  service: ServiceSlug;
  caption: string;
  /** "hero" renders a larger icon badge; "card" is the compact default. */
  variant?: "hero" | "card" | "detail";
  /** Set true when the parent has `group` + `overflow-hidden` for a hover-zoom card. */
  zoomOnHover?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const photo = serviceImages[service]?.[variant];
  const Icon = SERVICE_ICONS[service];

  if (photo) {
    return (
      <div className={`relative isolate overflow-hidden ${className}`}>
        <Image
          src={photo}
          alt={caption}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover ${zoomOnHover ? "transition duration-500 group-hover:scale-105" : ""}`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
          <p className="text-xs font-medium uppercase tracking-wide text-white/85">
            {caption}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br ${GRADIENTS[service]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 64px)",
        }}
        aria-hidden="true"
      />
      <div
        className={`relative flex h-full flex-col items-center justify-center p-8 ${zoomOnHover ? "transition duration-500 group-hover:scale-105" : ""}`}
      >
        <div
          className={`flex items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur ${
            variant === "hero" ? "h-20 w-20" : "h-16 w-16"
          }`}
        >
          <Icon className={variant === "hero" ? "h-10 w-10 text-white" : "h-8 w-8 text-white"} />
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
