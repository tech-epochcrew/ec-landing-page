# EpochCrew — Landing Page

Marketing landing page for **EpochCrew**, "the crew you'll never meet." Built with Next.js 16 (App Router) and Tailwind CSS v4, with a fully token-driven design system that tracks light/dark themes automatically.

## Highlights

- **Animated intro** — types the tagline, crossfades to the brand, then lifts the veil to reveal the hero.
- **Hero video carousel** — full-bleed autoplaying clips with a floating frosted-glass navbar.
- **"Always-On, Never Off" team section** — sticky-stacking panels for the four crew teams (Nirmaan · Product Reliability, Vistaar · Marketing, Outreach · Sales, Remedy · Customer Support). Each panel pins and the next slides over it, leaving each header peeking.
- **Interactive 3D dome gallery** (`#portfolio`) — drag to spin the wall, tap any tile to enlarge it.
- **Feedback form** — segmented categories with an inline success state.
- **Design tokens only** — every color, radius, and gradient comes from `app/globals.css`; nothing is hardcoded, so the whole site themes light/dark from one place.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [@use-gesture/react](https://use-gesture.netlify.app) — pointer/drag handling for the dome gallery
- [Manrope](https://fonts.google.com/specimen/Manrope) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
app/
  globals.css      Design tokens (colors, radii, gradients) + theme setup
  layout.tsx       Root layout, fonts, metadata
  page.tsx         Composes the landing sections
components/
  Landing.tsx      Intro → brand → hero orchestration
  Intro.tsx        Typewriter intro veil
  Hero.tsx         Hero section + tagline
  HeroVideos.tsx   Video carousel
  Navbar.tsx       Floating glass navigation
  MeetTheTeam.tsx  Sticky-stacking team section
  DomeGallery.tsx  3D dome gallery widget
  CrewGallery.tsx  Themed section wrapper for the dome
  Feedback.tsx     Feedback form
  Footer.tsx       Footer
lib/
  cn.ts            className merge helper
public/            Images and videos
```

## Theming

All colors are CSS custom properties defined in [`app/globals.css`](app/globals.css) and exposed to Tailwind via `@theme inline`. Use the token utilities (`bg-primary`, `text-muted-foreground`, `border-border`, …) rather than hardcoding values — dark mode is handled automatically via `prefers-color-scheme`.
