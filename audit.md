# SmartLane Website Audit
**Date:** April 2026
**Goal:** Maximise demo bookings. Language should be simple, accessible, and aligned with 2026 SaaS best practices.

---

## Executive Summary

The site has a solid structural foundation — a clear product narrative, a working demo form, and brand consistency in the design tokens. But it has several gaps that are directly hurting conversion: the hero has no product visual, the demo form asks for too much too soon, social proof is thin, and the page layout buries the CTA under content a visitor hasn't asked to see yet. The issues below are ordered roughly by conversion impact.

---

## 1. UX Audit

### 1.1 Hero — No Visual Product Proof
**Page:** `index.html`
The `hero-media--paper` div contains only a gradient — no screenshot, no mockup, no animation. The hero is entirely text. This is the single biggest conversion gap on the site. Visitors form a first impression in milliseconds and every high-performing SaaS homepage in 2026 shows the actual product above the fold. Product pages (e.g. `products.html`) already have a macbook + screen mockup — the homepage doesn't.

**Fix:** Add the macbook + dashboard screenshot to the homepage hero, identical to the pattern used on `products.html`.

---

### 1.2 Page Layout — Steps Before Features
**Page:** `index.html`
The homepage section order is:
1. Hero
2. Stats bar
3. Data section ("Operations intelligence")
4. **"Get started in three simple steps"** ← appears here
5. Features (Smart Delivery, Smart Ops, Smart Finance)
6. Local commerce
7. Demo form

Telling a visitor *how* to get started before they've understood *why they should* is backwards. "Get started" steps are a reward for someone already convinced — showing them too early creates confusion and disrupts the persuasion arc.

**Fix:** Move the steps section to sit between the features and the demo form.

---

### 1.3 Demo Form — Too Much Friction
**Page:** `index.html` (and `support.html`)
The homepage demo form asks for 5 required fields (email, name, phone, business name, city) plus 2 optional ones before the user gets any value. For a top-of-funnel demo request form, this is high friction. The support page form has 7 fields (adds monthly volume + challenges textarea).

Additionally, there are **two separate demo forms** with different field counts — one on the homepage, one on `support.html`. A visitor who clicks "Book demo" from a product page lands on `support.html` and sees a different form than someone who fills in the homepage form. This inconsistency erodes confidence.

**Fix:** Reduce the primary demo form to 3 fields: email, phone number, business name. Gather the rest post-submission or on the call. Unify both forms or clearly designate one as canonical.

---

### 1.4 Navigation — "Book Demo" Missing on Inner Pages
**Pages:** `smart-delivery.html`, `smart-ops.html`, `smart-finance.html`, `products.html`
The homepage nav includes a visible "Book demo" button in `nav-actions`. Inner pages only show "Track order" and "Sign in." Anyone reading a product page and deciding to act has no immediate CTA in the nav — they have to scroll to find a button or remember to go back to the homepage.

**Fix:** Add "Book demo" as a primary nav action on all pages, consistent with the homepage pattern.

---

### 1.5 CTA Label Inconsistency
Across the site, the primary action is called:
- "Book a demo" (hero, steps section)
- "Book demo" (nav, mega menu, footer)
- "Request demo" (form submit button)
- "Go to demo form →" (products page)

This fragmentation makes the action feel less decisive and harder to scan.

**Fix:** Pick one label and use it everywhere. Recommendation: **"Book a demo"** — it's active, personal, and standard for B2B SaaS.

---

### 1.6 No Mobile Navigation
The codebase has no hamburger menu or mobile nav pattern visible. The desktop nav relies on `padding: 0 111px` which will break on smaller viewports. Mobile commerce is the dominant context for Pakistani e-commerce operators — a broken mobile nav is a critical issue.

**Fix:** Implement a mobile hamburger menu with a slide-in drawer before the next release.

---

### 1.7 Contact Page — Placeholder Icons and Map
**Page:** `support.html`
The contact channel icons display raw text (`@`, `MSG`, `PH`, `HD`) as placeholder content. The location section renders a div with the literal text "Map preview." These are clearly unfinished states that were never resolved before the site went live.

**Fix:** Replace text placeholders with proper SVG icons (email, chat, phone, helpdesk). Replace the map placeholder with a static Google Maps embed or a styled image.

---

### 1.8 No Sticky or Persistent CTA
Once a visitor scrolls past the hero, there's no persistent "Book a demo" button visible until the very bottom of the page. The `nav-demo-reveal` class suggests a scroll-triggered reveal was intended but is incomplete.

**Fix:** Implement a sticky nav that reveals "Book a demo" after the hero section scrolls out of view. This is table-stakes UX for conversion-focused SaaS pages in 2026.

---

## 2. UI Audit

### 2.1 Dual CSS System
The homepage uses a parallel set of `--paper` variant classes (`hero--paper`, `section--paper`, `btn--paper-hero`, `h2--paper-data`, etc.) while all other pages use the base class set. This creates two separate maintenance tracks, and any design update needs to be applied twice.

**Fix:** Consolidate. Either adopt the "paper" aesthetic site-wide or strip the `--paper` suffixes and normalise to one token set. The paper variant's visual warmth is worth keeping — standardise it.

---

### 2.2 Empty Visual Slots Throughout the Homepage
Three separate sections contain empty placeholder divs:
- `step-icon-slot` in the "Get started" steps (3 × empty divs)
- `mockup--grad-a/b/c` in the feature rows (CSS gradient blobs, no actual screenshots)
- `pk-icon` divs in the "Built by Pakistanis" section (4 × empty divs)

The feature row mockups are the highest-priority gap — these sit next to the Smart Delivery, Smart Ops, and Smart Finance descriptions and are supposed to visually demonstrate the product. CSS gradients don't do that.

**Fix:** Add real product screenshots or illustrations to each feature row. Use simple SVG icons for the step slots and pk-grid items.

---

### 2.3 OG / Social Share Image Uses SVG
All pages set `og:image` to the logo SVG file. Most social platforms (Twitter/X, LinkedIn, WhatsApp) do not render SVGs as link previews — the result is a broken or missing image when the site is shared.

**Fix:** Create a proper 1200×630px OG image as a PNG or JPG for each page (or a single universal one to start). This also affects SEO.

---

### 2.4 Inline Styles on Inner Pages
`products.html` and `support.html` use extensive inline styles for typography sizing, spacing, and layout (`style="font-size: 48px; line-height: 54px; letter-spacing: -0.9px"`). This bypasses the design token system and makes future restyling tedious.

**Fix:** Extract repeated inline style patterns into named utility classes or component classes and apply the tokens consistently.

---

### 2.5 Hardcoded Colour Values
`#1A5FAD` is hardcoded in the stats bento CSS and `.step.is-dark` rather than referencing `var(--brand-600)` or `var(--brand-700)`. A brand colour change requires a manual hunt-and-replace.

**Fix:** Replace all hardcoded brand colours with token references.

---

### 2.6 No Testimonials or Logo Bar
There is no visual social proof section — no customer logos, no headshots with quotes, no video testimonials. "200+ merchants" is stated in text in multiple places but is never accompanied by a face, a name, or a logo. In 2026 this is one of the most reliably tested conversion improvements available.

**Fix:** Add a logo strip of recognisable merchant brands between the hero and the stats bar. Add 2–3 short testimonial quotes with merchant name, business type, and city.

---

## 3. Content Audit

### 3.1 Hero Headline — Functional, Not Compelling
**Current:** "One dashboard for every shipment and every COD rupee"
This is accurate and specific, which is good. But it describes the product, not the outcome or the relief it creates. The best-performing SaaS headlines in 2026 speak to what life looks like *after* using the product.

**Suggested direction:** Lead with the relief. For example:
> "Stop chasing COD. Start scaling."
> "Ship from every courier. Settle every rupee. One place."
> "Finally, one dashboard that runs Pakistani e-commerce end to end."

The current headline can become the subheadline or a descriptor.

---

### 3.2 Hero Subheadline — Too Many Jobs
**Current:** "SmartLane connects 16+ couriers with ops and finance workflows—so Pakistani e-commerce teams ship faster, see exceptions early, and settle with confidence."

This sentence is doing three jobs at once (product description + three outcomes). It's dense for someone scanning at pace.

**Fix:** Pick the single most motivating outcome and lead with it. The other two can become bullet points or feature cards. The stat "16+" is better placed in a feature callout than the subheadline.

---

### 3.3 FAQ Answers Are Too Vague
**Current FAQ Q:** "Which couriers do you support?"
**Current FAQ A:** "We connect you with multiple courier partners so you can compare rates and ship with confidence."

The question asks which couriers. The answer doesn't name a single one — despite the homepage stating "16+". This creates distrust at exactly the moment a visitor is trying to verify fit.

**Fix:** Name the major couriers: TCS, Leopards, Trax, M&P, Rider, BlueEx, and others. This builds confidence immediately.

---

### 3.4 "Local Commerce" Section — Ambiguous Numbers
**Current:** "Fashion & Apparel: 2,500+" / "Electronics & Gadgets: 1,200+"
These numbers have no label. 2,500+ what? Shipments? Merchants? Orders? Without units, the numbers feel inflated or suspicious.

**Fix:** Add a clear unit label ("merchants", "active brands") and, if possible, a time qualifier ("this year", "to date").

---

### 3.5 "Built by Pakistanis" Section — Weak Proof Points
The right panel of the local commerce section has four pk-grid items:
- "200+ Merchants"
- "100+ Scaled businesses"
- "Secure — Trusted security"
- "Fast setup — API & plugins"

"Trusted security" and "Fast setup" with empty icons look like placeholders. "100+ Scaled businesses" is unclear (is this a subset of 200+ merchants? What does "scaled" mean here?).

**Fix:** Replace vague claims with specific, verifiable facts. For example: "ISO-compliant data handling", "Shopify & WooCommerce plugins", "Setup in under 2 minutes." Use actual SVG icons.

---

### 3.6 The 14-Day Trial Is Buried
The free trial offer — one of the most powerful conversion levers available — appears as the last bullet point in a 3-item list on the "What you'll see on the call" panel. It's easy to miss entirely.

**Fix:** Elevate the trial offer. It should appear in the hero subheadline or as a standalone callout near the primary CTA. Consider: **"Book a demo → then start your 14-day free trial"** as the CTA stack.

---

### 3.7 No Pricing Signal
There is no pricing page and no mention of how pricing works (per-shipment, monthly SaaS, tiered). For Pakistani e-commerce operators evaluating tools, the absence of any pricing signal creates anxiety and may deter form submissions from people who assume it's expensive.

**Fix:** Add a "Pricing" link to the nav (even if the page just says "Talk to us for a quote") or add a one-line signal near the demo form: "Pricing scales with your volume — no setup fees."

---

### 3.8 Page Titles Are Weak for SEO
- `SmartLane — Products`
- `SmartLane — Support & demo`
- `SmartLane — Smart Delivery`

These titles don't include target keywords and won't rank for searches like "courier management software Pakistan" or "COD reconciliation platform Pakistan."

**Fix:** Rewrite page titles in the format: `[Feature/Product] | Logistics Platform for Pakistani E-commerce | SmartLane`.

---

## 4. Improvement Plan

### Priority 1 — Immediate (High conversion impact)

| # | Change | Where |
|---|--------|--------|
| 1 | Add product screenshot to homepage hero | `index.html` |
| 2 | Add product screenshots to feature row mockups | `index.html` |
| 3 | Reduce demo form to 3 fields (email, phone, business name) | `index.html`, `support.html` |
| 4 | Standardise CTA label to "Book a demo" everywhere | All pages |
| 5 | Add "Book a demo" to the nav on all inner pages | All pages |
| 6 | Elevate the 14-day trial offer to the hero CTA area | `index.html` |
| 7 | Add 2–3 customer testimonials (name, city, business type) | `index.html` |

---

### Priority 2 — Short-term (Trust and structure)

| # | Change | Where |
|---|--------|--------|
| 8 | Reorder homepage: Hero → Stats → Features → Steps → Demo | `index.html` |
| 9 | Add a logo bar of recognisable merchant brands | `index.html` |
| 10 | Name specific couriers in the FAQ answer | `index.html` |
| 11 | Add units to the local commerce numbers | `index.html` |
| 12 | Replace text placeholders with SVG icons (contact + steps + pk-grid) | `index.html`, `support.html` |
| 13 | Fix map placeholder with embed or static image | `support.html` |
| 14 | Add a pricing page or pricing signal near the demo form | New page + `index.html` |
| 15 | Implement sticky nav with "Book a demo" reveal on scroll | All pages |

---

### Priority 3 — Medium-term (Quality and reach)

| # | Change | Where |
|---|--------|--------|
| 16 | Consolidate the dual `--paper` / base CSS system | CSS |
| 17 | Replace inline styles with token-based utility classes | Inner pages |
| 18 | Replace hardcoded `#1A5FAD` with `var(--brand-600)` | CSS |
| 19 | Create a proper 1200×630 OG image PNG for social sharing | All pages |
| 20 | Rewrite page `<title>` tags with keyword-rich format | All pages |
| 21 | Implement mobile hamburger nav | All pages |
| 22 | Rewrite hero headline to lead with outcome, not product description | `index.html` |
| 23 | Clarify "100+ Scaled businesses" with a concrete definition | `index.html` |

---

### Priority 4 — Longer-term (Content depth)

| # | Change | Where |
|---|--------|--------|
| 24 | Publish 1–2 customer case studies and link from homepage | Resources |
| 25 | Add a "How it works" page or short video walkthrough | New page |
| 26 | Add Urdu language support or an Urdu toggle | Site-wide |
| 27 | Add dark mode token set | CSS |

---

## Appendix: 2026 SaaS Homepage Benchmark Checklist

For reference — what top-converting SaaS homepages consistently include in 2026:

- ✅ Product screenshot or UI preview above the fold
- ✅ One primary CTA, one secondary CTA in the hero
- ✅ Social proof within the first scroll (logos, testimonials, or stats)
- ✅ 3-field or fewer top-of-funnel form
- ✅ Trial offer prominently visible
- ✅ Pricing page or pricing signal
- ✅ Sticky CTA in the nav
- ✅ Mobile-first navigation
- ✅ Named customer logos or testimonials
- ✅ Video or interactive product walkthrough
- ❌ SmartLane currently passes: Stats bar, demo form on homepage, FAQ section, clear product names, local positioning
- ❌ SmartLane currently misses: Product visual in hero, testimonials, logo bar, trial prominence, pricing signal, mobile nav, sticky CTA
