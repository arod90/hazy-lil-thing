# Hazy Lil' Thing — site

Marketing + shop landing page for the **Hazy Lil' Thing** hazy IPA.
Next.js (App Router) + TypeScript. Warm near-black / cream / marker-red,
Buck's-Sauce-inspired, full-viewport scroll-snapped sections with scroll
parallax on the can and a working cart.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build && npm start   # production build
```

## Where things live

- `app/layout.tsx` — fonts (Bricolage Grotesque + Hanken Grotesk via `next/font`), metadata, cart provider, nav, cart drawer.
- `app/page.tsx` — section order.
- `app/globals.css` — the whole design system (colors as CSS vars at `:root`, animations, scroll-snap, reveals).
- `components/` — one file per section. Client components: `Nav`, `Shop`, `CartDrawer`, `CartProvider`, `ParallaxCan`, `Newsletter`.
- `lib/products.ts` — packs, prices, discount + free-ship thresholds, `money()`.
- `public/can.png` — the can artwork (transparent).

## Swap before launch (all flagged in the UI)

- **Prices** — `lib/products.ts` (`PACKS`). Placeholders chosen so the cart math works.
- **ABV / IBU / hops / serve temp** — in `Hero.tsx` (marked in red).
- **Reviews** — `components/Reviews.tsx` (labelled "sample").
- **Award card** — `components/Why.tsx` (`[Your Beer Fest]`).
- **Email / socials / © year** — `Footer.tsx` (bracketed).

## Wire up the real systems

- **Checkout** — `CartDrawer.tsx` checkout button → Stripe Checkout or a Shopify cart. Cart state lives in `components/CartProvider.tsx`.
- **Newsletter** — `Newsletter.tsx` `onSubmit` → your email provider (Klaviyo / Mailchimp / Resend).
- **Cart persistence** — add `localStorage` to `CartProvider` if you want carts to survive refresh.

## Notes

- The can floats (ambient) inside a scroll-parallax wrapper (`ParallaxCan.tsx`); tune drift with the `intensity` prop.
- Reveals use CSS scroll-driven animations (`animation-timeline: view()`); they degrade to fully-visible on older browsers and respect `prefers-reduced-motion`.
- "Hazy Lil' Thing" is close to Sierra Nevada's "Hazy Little Thing" — check trademark before printing cans.
