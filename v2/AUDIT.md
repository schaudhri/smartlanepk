# V2 UX audit — SmartLane static site

Audit date: April 2026. Scope: [v2/index.html](index.html), [v2/style.css](style.css), [v2/scripts/main.js](scripts/main.js), [v2/pages/*.html](pages/).

## Summary

| Priority | Theme | Status |
|----------|--------|--------|
| P0 | Accessibility: focus, skip link, hero mockup semantics, track field name, live regions, reduced motion | Addressed in implementation |
| P1 | Forms: native validation + announcements; track page states (invalid ID vs demo result); mobile menu scroll lock | Addressed in implementation |
| P2 | Typography (balance/pretty), tabular numerals, footer year, duplicate CSS, OG/Twitter meta (home) | Addressed in implementation |

## Findings (by area)

### Information architecture & navigation

- Home logo uses `#top`; inner pages use `../index.html` — consistent.
- “Book a demo” uses `#demo` on home/support where section exists; other pages use `support.html#demo` — valid.
- Legal pages (`privacy.html`, `terms.html`) use a simplified nav without mega-menu or track — acceptable for legal.

### Forms

- Demo and newsletter are client-side only; copy clarifies preview behaviour where updated.
- `data-form-live` was unused — wired to announce validation and success.
- Newsletter success lacked status semantics — `role="status"` and focus management added.

### Track experience

- Nav dropdown input lacked an associated label — `sr-only` label + `id` added.
- Track page always showed mock success for any non-empty `?id=` — short/invalid IDs now show an error state; valid-length IDs show demo result with disclaimer.

### Accessibility

- Hero dashboard mock used `<a>` without `href` — replaced with non-interactive spans.
- Global `:focus-visible` ring added for keyboard users.
- Skip link added to skip repeated navigation.

### Motion

- Scroll-linked `.appear` animations respect `prefers-reduced-motion`; JS skips stagger when reduced motion is preferred.

### Trust & content

- Footer © year updated to 2026.
- Placeholder WhatsApp number noted for CMS/backend follow-up (not changed — may be intentional).

### SEO / sharing

- Open Graph and Twitter Card meta added on the home page; update `og:url` / `og:image` when production URL and share image are final.

## Verification notes (static review)

- Skip link targets `#main-content` on every page that defines it; tab order reaches main after activation.
- Nav dropdowns close on Escape and on outside click; demo form uses `reportValidity()` before the success state.
- Track page: `?id=` empty keeps placeholder; `?id=ab` shows error panel; `?id=SL-4821` shows demo result and banner.
- Reduced motion: `.appear` elements get `.visible` immediately when `prefers-reduced-motion: reduce` matches.

## Residual opportunities

- Wire demo/newsletter forms to a real endpoint or automation.
- Replace track mock with API-backed results and loading states.
- Add a hosted `og:image` asset and canonical URLs per environment.
- Unify legal pages nav with product nav if brand consistency is required.
