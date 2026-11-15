# FLARE: Digital Marketing Campaign Site

A launch campaign for **FLARE**, a fictional sparkling energy drink. It has three landing pages, a set of animated display ad banners, an A/B tested headline and click tracking on every call to action.

**Live site:** https://sidhantpujara10.github.io/FLARE-DRINKS/

![FLARE launch page](docs/screenshot-launch.png)

## Why I built this

Marketing teams need landing pages and ad banners that look good, load fast and can be measured. I built FLARE to practise the full workflow of a campaign web developer: design, build, test, track and deploy.

## Features

| Page | What it shows |
|---|---|
| **Launch** | Product launch page with an A/B tested headline, scroll animations, a flavor gallery and animated stats |
| **Offer** | Limited time offer with a live 48 hour countdown, pricing packs and an FAQ |
| **Waitlist** | Signup form with validation, error messages and a success screen |
| **Ad banners** | Animated banners in the 3 standard display ad sizes: 300x250, 728x90 and 160x600 |

**Marketing features**
* **A/B test:** each visitor sees version A or B of the main headline and button. Force one with `#/?v=a` or `#/?v=b`
* **Click tracking:** every page view, button click, banner click and signup is recorded with the A/B version, ready to send to a backend over HTTP
* **Standard ad sizes:** banners use pure CSS animation, so they also work outside React

**Quality**
* Responsive on mobile, tablet and desktop
* Accessible color contrast and keyboard friendly navigation
* Animations turn off for users who set reduced motion on their device
* Fonts bundled locally, no external requests

## Scroll animations

* Hero drink can that tilts, grows and drifts as you scroll
* Paragraph that lights up word by word while pinned on screen
* Horizontal flavor gallery driven by vertical scrolling
* Feature cards that stack on top of each other
* Text band that speeds up and changes direction with scroll speed
* Offer section where three cans fan out as the background turns orange
* Smooth scrolling and a scroll progress bar

## Design

White background, fiery orange `#FF5A1F` as the accent and midnight navy `#0B1F3A` as the third color. Flat colors only, no gradients.

## Tech stack

| Area | Tools |
|---|---|
| Framework | React 19, Vite |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion), Lenis smooth scroll |
| Routing | Custom hash router (works on any static host) |
| Deployment | GitHub Actions, GitHub Pages |

## Project structure

```
src/
  pages/        Launch, Offer, Waitlist and Banners pages
  components/   Reusable UI and scroll animation components
  banners/      The 3 display ad banners
  lib/          A/B test, click tracking, router and smooth scroll
.github/workflows/deploy.yml   Builds and deploys on every push to main
```

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

Other commands:

```bash
npm run build          # production build in dist/
npm run build:single   # whole site in one HTML file
```

## Connect click tracking to a backend

Tracking lives in `src/lib/track.js`. To send events to an API, create a `.env` file:

```
VITE_TRACK_URL=https://your-api.example.com/api/events
```

Each event is sent as JSON, for example:

```json
{ "event": "cta_click", "cta": "hero_offer", "variant": "b", "ts": "2026-11-15T08:00:00.000Z" }
```

## What I learned

* Building scroll linked animations that stay smooth on mobile
* Setting up an A/B test and tracking which version gets more clicks
* Designing ad banners for fixed sizes with no room to waste
* Writing accessible pages that respect user settings like reduced motion
* Deploying automatically with GitHub Actions

## Next steps

* Backend in Node.js and Express to store tracked clicks in a database
* Dashboard showing which A/B version performs better
* Rebuild the landing pages as components in Adobe Experience Manager

## Author

**Sidhant Pujara**
[LinkedIn](https://linkedin.com/in/sidhant-pujara) · [Portfolio](https://sidhantpujara.vercel.app)

FLARE is a fictional brand made for this portfolio project.
