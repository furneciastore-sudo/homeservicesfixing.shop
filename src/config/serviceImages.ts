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
 *   /images/services/<slug>-hero.jpg   — large cinematic hero crop (4:3)
 *   /images/services/<slug>-card.jpg   — service grid card (4:5 portrait)
 *   /images/services/<slug>-detail.jpg — service page action banner (21:9)
 */
export type ServiceImageSet = {
  hero: string | null;
  card: string | null;
  detail: string | null;
};

function emptySet(): ServiceImageSet {
  return { hero: null, card: null, detail: null };
}

export const serviceImages: Record<ServiceSlug, ServiceImageSet> = {
  hvac: {
    hero: "/images/services/hvac-hero.webp",
    card: "/images/services/hvac-card.jpg",
    detail: "/images/services/hvac-detail.webp",
  },
  plumbing: { ...emptySet(), card: "/images/services/plumbing-card.webp" },
  electrician: { ...emptySet(), card: "/images/services/electrician-card.webp" },
  "appliance-repair": emptySet(),
  roofing: emptySet(),
  locksmith: emptySet(),
  "garage-door-repair": {
    ...emptySet(),
    hero: "/images/services/garage-door-repair-hero.webp",
  },
};

/** Short, honest, non-claim-making captions — describe the scene, invent nothing. */
export const SERVICE_PHOTO_CAPTIONS: Record<ServiceSlug, string> = {
  hvac: "Residential AC condenser service",
  plumbing: "Residential plumbing service",
  electrician: "Residential electrical service",
  "appliance-repair": "Appliance diagnostic and repair",
  roofing: "Residential roof inspection",
  locksmith: "Residential lock service",
  "garage-door-repair": "Garage door system service",
};
