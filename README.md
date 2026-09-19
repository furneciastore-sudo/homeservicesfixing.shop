# HomeServicesFixing.shop

A USA home-services lead-generation website. It connects visitors with the
right service phone line — HVAC, plumbing, electrical, appliance repair,
roofing, locksmith, and garage door repair — based on real ZIP-code
coverage data. The primary conversion is a phone call: every "Call Now"
button opens the visitor's phone dialer directly via a `tel:` link.

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build & deploy

```bash
npm run build
npm run start
```

Deploy anywhere that runs a Node.js server (Vercel, a container, etc.) —
there's no special infrastructure requirement beyond Node.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you use. Every
variable is optional — the site works with none of them set.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata, `sitemap.xml`, and `robots.txt`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Loads Google Analytics 4 (`gtag`) when set. |
| `NEXT_PUBLIC_GTM_ID` | Loads Google Tag Manager instead of GA4 directly, when set. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Loads the Meta (Facebook) Pixel when set. |

Never commit `.env` or `.env.local` — they're gitignored. Only
`.env.example` (with blank values) is checked in.

## Phone number management

**Every phone number lives in one place: `src/config/phoneNumbers.ts`.**
Never hard-code a `tel:` link elsewhere — import from that file, or (for
service-specific numbers) read `service.phone` from
`src/config/services.ts`.

```ts
export const PHONE_NUMBERS = {
  hvac: makePhoneNumber("+18312309683", "(831) 230-9683"),
  plumbing: makePhoneNumber("+16073001044", "(607) 300-1044"),
  electrician: makePhoneNumber("+17257458442", "(725) 745-8442"),
};
```

To add a number for a service that doesn't have one yet (appliance
repair, roofing, locksmith, garage door repair): add an entry to
`PHONE_NUMBERS`, then set `phone: PHONE_NUMBERS.yourService` on that
service in `src/config/services.ts`. The site automatically starts
showing a real Call button for that service everywhere — service pages,
the ZIP checker, the header/sticky-bar "Call Now" menu — with no other
code changes. Until a number is set, `phone` stays `null` and the UI
shows a "coming soon" message instead of a broken button.

All calls render through `src/components/CallLink.tsx`, which guarantees
a real `tel:` href and fires the `call_click` analytics event.

## Coverage data management

Service-area coverage (which ZIP codes each service is available in) is
the source of truth for what the site claims is available — the site
never invents coverage.

- **Source file**: `src/data/source/RingSphere_Coverage_Areas.xlsx`
  (one sheet per service: Plumbing, HVAC, Electrician, Appliance Repair,
  Roofing, Locksmith, Garage Door Repair — each with Zip Code / City
  Name / State columns).
- **Generated data**: `src/data/coverage/<service-slug>.json` — a flat
  array of `{ zip, city, state }` records, ZIP codes stored as
  zero-padded 5-character strings (never as numbers, to preserve leading
  zeros like `07001`).
- **Regenerating**: whenever the spreadsheet changes, replace the file
  at `src/data/source/RingSphere_Coverage_Areas.xlsx` (or pass a path)
  and run:

  ```bash
  npm run build:coverage
  # or: npm run build:coverage -- path/to/NewCoverage.xlsx
  ```

  Commit the updated JSON files under `src/data/coverage/`.

- **Reading the data**: use the helpers in `src/lib/coverage.ts` —
  `checkCoverage(service, zip)`, `getCoverageRecord`, `getServicesForZip`,
  `getStates`, `getCities`, `getZips`, `getCoverageCount`. Nothing else
  should read the JSON files directly.
- The `xlsx` package used by `scripts/build-coverage.mjs` is a
  **devDependency only** — it's never imported by the running site, so
  it isn't part of the production bundle or attack surface. Only run the
  script against workbooks you trust.

## Adding a new service

1. Add the coverage sheet to the source spreadsheet and re-run
   `npm run build:coverage` (see above), including the sheet name in
   `SHEET_TO_SLUG` in `scripts/build-coverage.mjs`.
2. Add an entry to `SERVICES` in `src/config/services.ts` (name,
   description, subservices, common problems, `imageKey`, and `phone`
   — `null` until a number is assigned).
3. Create `src/app/<slug>/page.tsx` and `src/app/<slug>/[state]/page.tsx`
   following the pattern in the existing service folders (e.g.
   `src/app/hvac/`) — each is a few lines that call the shared
   `ServicePage` / `ServiceStatePage` components.
4. Add a caption for the service's visual in
   `src/components/ServiceGrid.tsx` and `src/components/ServicePage.tsx`.

## Adding images

Hero and service visuals currently use `src/components/ServiceVisual.tsx`,
an original gradient/icon placeholder (not stock photography, so there's
no licensing risk, but it's a stand-in). To use real, properly licensed
photography instead:

1. Add the image to `public/images/services/<slug>.jpg` (or `.webp`).
2. In `ServiceVisual.tsx`, replace the placeholder `<div>` with a
   `next/image` `<Image src={\`/images/services/${service}.jpg\`} fill
   alt={caption} />` (keep the caption overlay for context/SEO).

Only use imagery you have the rights to use.

## Analytics

`src/lib/analytics.ts` exports `trackEvent()`, called for: `call_click`,
`service_selected`, `zip_search`, `coverage_found`, `coverage_not_found`,
`service_page_view`, and `cta_click`. It pushes to `window.dataLayer`
(GTM), `gtag` (GA4), and `fbq` (Meta Pixel) whenever those are present —
see `src/components/AnalyticsScripts.tsx`, which loads each script only
when its corresponding `NEXT_PUBLIC_*` env var is set.

## Project structure

```
src/
  app/                 Routes (App Router) — homepage, one folder per
                       service, [state] subpages, sitemap.ts, robots.ts
  app/actions/         Server actions (ZIP coverage check runs server-side
                       so the ~33k-row dataset never ships to the client)
  components/          UI components
  config/              Central phone number and service configuration
  data/coverage/       Generated per-service coverage JSON (checked in)
  data/source/          Source coverage spreadsheet
  lib/                 Coverage query helpers + analytics helper
scripts/
  build-coverage.mjs   Converts the source spreadsheet into coverage JSON
```

## Quality checks

```bash
npm run lint
npm run build
```

Both should complete with no errors before shipping a change.
