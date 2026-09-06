# Chalupa u Bedýnků

Vite + React website for the chalet in Prkenný Důl. Czech copy, original property details, and enhanced property photography.

## Development

Use Node.js 22.12+ (tested on Node 24).

```sh
npm ci
npm run dev
```

The development site runs at http://127.0.0.1:5173.

```sh
npm test
npm run build
npm run preview
```

`npm run build` creates the client bundle, renders all eight pages to static HTML, and writes the deployable site to `dist/`. Publish that directory on a static host. Existing `.html` URLs remain valid; no SPA rewrite rules are required. React hydrates the static markup for interactions.

## Structure

- `src/components/`: shared navigation, photo dialog, draggable hero, room selector, booking bar, FAQ.
- `src/pages/`: React components for all eight pages.
- `src/data.js`: property photos, pricing, FAQs, activities, navigation.
- `src/rules.json`: guest instructions and operating rules retained from the original site.
- `src/booking.js`: date arithmetic and enquiry input validation.
- `src/styles.css`: responsive styles and reduced-motion handling.
- `public/assets/img/`: production photographs, including original and AI-enhanced versions.
- `scripts/prerender.mjs`: renders each route after the client build.
- Root HTML files: route-specific metadata and Vite entry points.

## Open-source components

- [React](https://github.com/facebook/react) and [Vite](https://github.com/vitejs/vite): UI and build.
- [Embla Carousel](https://github.com/davidjerleke/embla-carousel): touch and mouse dragging in the hero; no forced autoplay.
- [Motion](https://github.com/motiondivision/motion): image crossfades; respects reduced-motion preferences.
- [Radix Dialog](https://github.com/radix-ui/primitives): modal focus management, Escape dismissal, mobile navigation.
- [Lucide](https://github.com/lucide-icons/lucide): icon set.

Dependencies are installed through npm and versioned in `package-lock.json`; their licenses remain in their distributions. No unrelated starter repository was copied.

## Booking

The hero form transfers dates and guest count through URL parameters. The enquiry form retains the existing FormSubmit destination (`chataubedynku@seznam.cz`). It is an enquiry, not a live availability calendar. Actual delivery requires the existing FormSubmit account configuration; tests do not submit messages. The pricing calculator splits the published whole-property price across guests and explicitly excludes extra charges.

## Validation

Tests cover date/DST boundaries, capacity and query validation, hero season switching, photo filters, modal keyboard navigation and focus restoration, room tabs, pricing, activity filters, and form prefilling. All routes are rendered at build time. Browser visual/drag testing requires a connected browser; none was available during this session.

Photo edit prompts and provenance are in `docs/image-enhancements.md`. The root `assets/img` directory retains the earlier source photos; the Vite build serves their `public/assets/img` copies.
