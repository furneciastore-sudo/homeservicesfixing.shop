import type { ServiceSlug } from "@/config/services";

/**
 * Central image configuration — fill these in once real, licensed
 * photography (or generated original imagery) is available, and every
 * component that renders a service photo picks it up automatically with
 * no other code changes.
 *
 * Until a path is set, `ServiceVisual` renders an original placeholder
 * graphic instead (see src/components/ServiceVisual.tsx) — never a broken
 * image and never a stock photo we don't have the rights to use.
 *
 * Expected file locations once populated (all under public/):
 *   /images/services/<slug>-hero.jpg     — large cinematic hero crop
 *   /images/services/<slug>-card.jpg     — service grid card (16:10ish)
 *   /images/services/<slug>-detail.jpg   — service page detail shot
 *   /images/services/<slug>-technician.jpg — action-strip / showcase shot
 */
export type ServiceImageSet = {
  hero: string | null;
  card: string | null;
  detail: string | null;
  technician: string | null;
};

function emptySet(): ServiceImageSet {
  return { hero: null, card: null, detail: null, technician: null };
}

export const serviceImages: Record<ServiceSlug, ServiceImageSet> = {
  hvac: emptySet(),
  plumbing: emptySet(),
  electrician: emptySet(),
  "appliance-repair": emptySet(),
  roofing: emptySet(),
  locksmith: emptySet(),
  "garage-door-repair": emptySet(),
};

/** Short, honest, non-claim-making captions — describe the scene, invent nothing. */
export const SERVICE_PHOTO_CAPTIONS: Record<ServiceSlug, string> = {
  hvac: "Residential AC condenser service",
  plumbing: "Water heater repair",
  electrician: "Electrical panel inspection",
  "appliance-repair": "Appliance diagnostic and repair",
  roofing: "Residential roof inspection",
  locksmith: "Residential lock service",
  "garage-door-repair": "Garage door system service",
};
