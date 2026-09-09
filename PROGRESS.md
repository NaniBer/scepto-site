# Scepto Import PLC — Build Progress

## Live Site
- **Production URL**: https://scepto-site.vercel.app (Vercel, account: naniber)
- **Original site (untouched)**: https://website-tau-sooty-96.vercel.app/
- **Dev server**: http://localhost:5173 (Vite HMR)
- **vercel.json**: SPA rewrite rule — all routes → /index.html

## Tech Stack
- React 19 + Vite 7 + Tailwind CSS v4 (@tailwindcss/vite) + react-router-dom v7
- Project root: `/Users/mac/Documents/scepto-site`

## Design System (src/index.css)
- Fonts: Palanquin (100–700 via Google Fonts), Tailwind font-display/font-body
- Palette: bg #0b1626, surface #132741, surface2 #1b3454, deep #060d1a, line #22334b, ink #f4f7fb, mist #9badc6, paper #f7f8fa, card #fff, inklight #0b1626, mistlight #5b6b82, linelight #e4e7ec, volt #f7b500, voltup #ffc21f, arc #2f80ff, amber-ink #8a6400
- Component classes: .shell, .eyebrow, .btn-volt/ghost/ghost-light/navy/outline-navy, .card-dark/light, .panel-light/dark, .chip/chip-volt/chip-amber, .nav-link, .spec-table, .form-input-dark, .rail-link/.rail-icon/.rail-label, .glow, .divider-volt, .zoom, .marquee/.marquee-track, .reveal/.is-shown, .page-fade, .menu-in, .pulse-dot, .stage-progress, .no-scrollbar
- Rules: NO code comments, NO emojis, prefers-reduced-motion respected, document.title per page

## Pages
- **Home (src/pages/Home.jsx)**: Hero (ghost, slide 3.4s, partners text list), brands marquee, animated stats, "What we do" section with auto-scrolling product rail (HomeRail), Why Scepto + storefront, CTA band
- **About (src/pages/About.jsx)**: Story, values, departments, UPS range, battery range, accessories, CTA band
- **Products (src/pages/Products.jsx)**: Hero, A–E direction switcher (Atelier/Vitrine/Dossier/Lookbook/Editorial), CTA band
- **Contact (src/pages/Contact.jsx)**: Form (client-side + honeypot), showroom card, map, opening hours

## Shared Components
- Header (sticky, mobile menu, active route highlight)
- Footer (4-column, 50+w, CTA band)
- SocialRail (fixed left desktop social icons)
- Reveal (IntersectionObserver, stagger support)
- SectionHead (eyebrow + title)

## Data Layer (src/data/content.js)
- Exports: NAV, TAGLINE, BLURB, SOCIALS, CONTACT, VIDEO_EMBED, HERO_SLIDES, STATS, CATEGORIES, PRODUCTS (10 lines with domain field), DOMAINS (4), PARTNERS (10 brands), SECTORS, PROCESS, DEPARTMENTS, UPS_RANGE, BATTERY_RANGE, ACCESSORIES, MARQUEE_BRANDS (9 names), ABOUT_PARAGRAPHS (new intro text), ABOUT_MOTTO ("Driven by quality, powered for innovation, Built for reliability.")
- UPS_RANGE, BATTERY_RANGE, ACCESSORIES — exported but no longer used by any page (tech reference sections were removed)

## Images (public/images/)
- products/: 12 product shots (solar-panel, kstar-hybrid-inverter, lithium-battery, kstar-6kva-tower, generator-kp-bd20p, pump, kstar-cooling, ro-drinking, data-center, generator-large, kstar-hh6ks-allinone, steel-casings)
- accessories/: 5 (breaker, changeover-switch, earthing, surge-protection, water-probe-sensor)
- misc/: storefront.jpg
- scepto-logo.png

## Products Page — Design Directions (currently deployed with A–E switcher)
- **A · Atelier**: bare extralight name list, cursor-following floating image panel (desktop), mobile thumbnails
- **B · Vitrine**: dark gallery, one product at a time, ghost numerals, thin line indicators, 5s auto-tour
- **C · Dossier**: domain-grouped precision rows, "Line 01 — Brand" stamps, middot specs, hover-reveal Enquire
- **D · Lookbook**: 2-col editorial grid, 4:5 portraits, ghost numerals bleeding corners
- **E · Editorial**: AlliedFZ-inspired alternating dark/light zones, accent subheads, volt diamond spec bullets

## Home Page — Product Listing (baked in: auto-scrolling Rail)
- **HomeRail**: infinite seamless drift (~30px/s), duplicated tile set for loop, hover/wheel/pointer pause + 2.4s resume, volt progress bar (sawtooths), edge fade mask, prefers-reduced-motion → manual only
- Previous rejected variants: Pillars (quad domain grid), Index (atelier echo), Bento (asymmetric grid), Stage (dark spotlight), Split (sticky preview)

## What We're Working On Now
1. **Logo replacement for "Principal partners" section in hero** — replace text names (JA Solar · KSTAR · Franklin Electric · Keypower · Kaz) with their actual brand logos. Hero background is dark navy (#0b1626) → need white/monochrome logos. CSS trick: `brightness(0) invert(1)` converts colored logos to white silhouette on dark bg.
2. AlliedFZ.co (alliedfz.co) was fetched — full HTML saved to `/Users/mac/.local/share/opencode/tool-output/tool_06bcb9a9d001e4fXr2KsP8bl1a`. Need to extract brand logo image paths from it using grep/read.
3. After finding logos → download to public/images/logos/ → update Home.jsx partner row to use images with opacity-70 hover:opacity-100, filter brightness(0) invert(1), h-6/h-7.
4. Also consider upgrading the marquee band (MARQUEE_BRANDS) to logo images instead of text names.
5. The user explicitly said **DO NOT DEPLOY before they accept**.

## Deployment Notes
- Vercel deploy: `vercel deploy --prod --yes` from project root
- SPA rewrite in vercel.json ensures deep links work
- Deploy the full site (all pages), not just changed page — Vite builds all at once
