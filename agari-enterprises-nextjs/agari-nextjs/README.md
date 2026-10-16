# Agari Enterprises — Next.js site

Rebuilt from the original single-file HTML site into a full Next.js app with
Tailwind CSS, GSAP scroll animations, a Three.js hero background, and an
AI chat assistant powered by the Claude API.

## What's inside

- **Next.js 14** (App Router) + **Node.js** — the framework and server runtime
- **Tailwind CSS** — utility classes, themed with Agari's original color tokens
  (paper / ink / copper / trace / wood) in `tailwind.config.js`
- **GSAP** (`components/RevealOnScroll.js`) — scroll-triggered reveal animations
  used throughout the page
- **Three.js** (`components/HeroScene.js`) — an animated "circuit trace"
  particle network in the hero background, evoking a PCB (fits an electronics
  repair shop). Pauses off-screen and respects reduced-motion settings.
- **AI chat assistant** (`app/api/chat/route.js` + `components/ChatWidget.js`)
  — a floating chat widget that calls the Claude API on the server, grounded
  with your real business facts (hours, phone, warranty, categories, FAQ) so
  it won't invent prices or order statuses.
- Real photos and brand logos, extracted from your original file, in `public/images/`
- The full product catalog, cart (WhatsApp checkout), repair/order request
  form, gallery, reviews, FAQ, and multi-branch map — all ported from the
  original site.

## Getting started

You'll need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Setting up the AI assistant

The chat widget works without any setup, but replies with a fallback message
pointing people to WhatsApp until you add a Claude API key.

1. Get a key from https://console.anthropic.com/
2. Copy `.env.example` to `.env.local`
3. Paste your key in: `ANTHROPIC_API_KEY=sk-ant-...`
4. Restart `npm run dev`

`.env.local` is already in `.gitignore` — never commit your real key.

The assistant's knowledge (hours, phone numbers, warranty policy, categories,
FAQ) lives in the `SYSTEM_PROMPT` at the top of `app/api/chat/route.js`. Edit
it any time your business details change — the widget picks it up automatically.

## Editing content

- **Business details, phone/WhatsApp numbers, hours, branches, brands, reviews, FAQ:**
  `lib/config.js`
- **Products, prices, categories:** `lib/catalog.js` — remember these are
  sample/indicative listings, as noted in the original site
- **Colors, fonts:** `tailwind.config.js`
- **Images:** `public/images/` — swap in new photos any time, same filenames

## Deploying

The easiest option is [Vercel](https://vercel.com) (made by the Next.js team):

1. Push this project to a GitHub repo
2. Import it on vercel.com
3. Add `ANTHROPIC_API_KEY` under Project Settings → Environment Variables
4. Deploy

Any Node.js host (Render, Railway, a VPS with `npm run build && npm start`)
works too, since the AI chat route needs a Node server (not static hosting).

## Notes

- Next.js is pinned to `14.2.35`, the version that patches the December 2025
  React Server Components security advisories. Run `npm audit` occasionally
  and keep Next.js updated.
- Product prices/stock are sample data for browsing — always confirm live
  pricing over WhatsApp before an order ships, same as the original site.
