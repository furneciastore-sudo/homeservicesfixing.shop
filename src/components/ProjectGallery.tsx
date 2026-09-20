import Image from "next/image";
import { serviceImages, SERVICE_PHOTO_CAPTIONS } from "@/config/serviceImages";
import type { ServiceSlug } from "@/config/services";

/**
 * "Recent Work" gallery — 4 fixed slots per service, filled from
 * serviceImages.<slug>.gallery. Empty slots render an honest, clearly
 * "awaiting content" placeholder (not the same icon art repeated 4x)
 * so the page never looks like a broken or padded-out gallery.
 */
export function ProjectGallery({ service }: { service: ServiceSlug }) {
  const slots = serviceImages[service].gallery;
  const caption = SERVICE_PHOTO_CAPTIONS[service];

  return (
    <section className="bg-surface py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-primary">Recent Work</h2>
        <p className="mt-2 text-sm text-muted">
          A look at real jobs handled by our service network.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {slots.map((photo, i) =>
            photo ? (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={photo}
                  alt={caption}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                key={i}
                className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background text-center"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Photo {i + 1}
                </span>
                <span className="mt-1 text-[11px] text-muted/70">
                  Coming soon
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
