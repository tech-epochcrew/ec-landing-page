# CLAUDE.md — epochcrew-web

This file is the source of truth for how code is written in this repository.
Read it fully before touching anything. Update it whenever you make a decision that future sessions need to know about.

---

## Repository Purpose

`epochcrew-web` contains two fully independent services. They share a repo but nothing else — separate frontends, separate backends, separate deployments, separate environment files.

- **`services/landing/`** → deployed to `epochcrew.com` — public site, communicates the vision, collects early feedback.
- **`services/dashboard/`** → deployed to `dashboard.epochcrew.com` — internal tool, monitors agent activity and company health across all child companies. Authenticated.

If landing goes down, dashboard is unaffected. If dashboard goes down, landing is unaffected. They do not share components, styles, config, or APIs.

---

## Folder Structure — Strict Adherence Required

Never create files outside this structure. If a new folder is genuinely needed, add it here first and explain why.

```
epochcrew-web/
│
├── services/
│   │
│   ├── landing/                                    # Service 1 — epochcrew.com
│   │   │
│   │   ├── client/                                 # Next.js frontend
│   │   │   ├── public/
│   │   │   │   └── assets/
│   │   │   │       ├── images/                     # Logos, OG images, illustrations
│   │   │   │       └── fonts/                      # Self-hosted fonts if needed
│   │   │   │
│   │   │   ├── src/
│   │   │   │   ├── app/
│   │   │   │   │   ├── globals.css                 # THE ONLY place for CSS variables and global styles
│   │   │   │   │   ├── layout.tsx                  # Root layout — fonts, metadata
│   │   │   │   │   └── page.tsx                    # Assembles all landing section components
│   │   │   │   │
│   │   │   │   ├── components/                     # All landing page UI components
│   │   │   │   │   ├── Nav.tsx
│   │   │   │   │   ├── Hero.tsx
│   │   │   │   │   ├── Model.tsx                   # The four departments section
│   │   │   │   │   ├── Phases.tsx                  # The five-phase vision section
│   │   │   │   │   ├── StatStrip.tsx               # Four stats bar
│   │   │   │   │   ├── FeedbackForm.tsx            # Feedback collection section
│   │   │   │   │   └── Footer.tsx
│   │   │   │   │
│   │   │   │   ├── config/
│   │   │   │   │   └── index.ts                    # Reads .env.local → exports typed config
│   │   │   │   │
│   │   │   │   ├── lib/
│   │   │   │   │   └── api.ts                      # API call helpers → calls landing/api
│   │   │   │   │
│   │   │   │   └── types/
│   │   │   │       └── index.ts                    # All TypeScript types for landing
│   │   │   │
│   │   │   ├── .env.local
│   │   │   ├── next.config.ts
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   └── api/                                    # Hono backend for landing only
│   │       ├── src/
│   │       │   ├── routes/
│   │       │   │   ├── feedback.route.ts           # Handles feedback form submissions
│   │       │   │   └── index.ts                    # Mounts all routes
│   │       │   │
│   │       │   ├── middleware/
│   │       │   │   └── cors.middleware.ts
│   │       │   │
│   │       │   ├── services/
│   │       │   │   └── feedback.service.ts         # Business logic for feedback
│   │       │   │
│   │       │   ├── config/
│   │       │   │   └── index.ts                    # Reads .env → exports typed config
│   │       │   │
│   │       │   └── index.ts                        # Hono entry point
│   │       │
│   │       ├── .env
│   │       ├── Dockerfile
│   │       ├── package.json
│   │       └── tsconfig.json
│   │
│   └── dashboard/                                  # Service 2 — dashboard.epochcrew.com
│       │
│       ├── client/                                 # Next.js frontend
│       │   ├── public/
│       │   │   └── assets/
│       │   │       ├── images/
│       │   │       └── fonts/
│       │   │
│       │   ├── src/
│       │   │   ├── app/
│       │   │   │   ├── globals.css                 # THE ONLY place for CSS variables and global styles
│       │   │   │   ├── layout.tsx                  # Root layout — auth guard, sidebar
│       │   │   │   └── page.tsx                    # Assembles dashboard components
│       │   │   │
│       │   │   ├── components/                     # All dashboard UI components
│       │   │   │   ├── AgentStatus.tsx
│       │   │   │   ├── CompanyToggle.tsx
│       │   │   │   └── TaskFeed.tsx
│       │   │   │
│       │   │   ├── config/
│       │   │   │   └── index.ts                    # Reads .env.local → exports typed config
│       │   │   │
│       │   │   ├── lib/
│       │   │   │   └── api.ts                      # API call helpers → calls dashboard/api
│       │   │   │
│       │   │   └── types/
│       │   │       └── index.ts                    # All TypeScript types for dashboard
│       │   │
│       │   ├── .env.local
│       │   ├── next.config.ts
│       │   ├── package.json
│       │   └── tsconfig.json
│       │
│       └── api/                                    # Hono backend for dashboard only
│           ├── src/
│           │   ├── routes/
│           │   │   ├── dashboard.route.ts          # Agent status, task feed, company data
│           │   │   └── index.ts
│           │   │
│           │   ├── middleware/
│           │   │   ├── auth.middleware.ts
│           │   │   └── cors.middleware.ts
│           │   │
│           │   ├── services/
│           │   │   └── dashboard.service.ts        # Business logic for dashboard data
│           │   │
│           │   ├── config/
│           │   │   └── index.ts                    # Reads .env → exports typed config
│           │   │
│           │   └── index.ts
│           │
│           ├── .env
│           ├── Dockerfile
│           ├── package.json
│           └── tsconfig.json
│
├── docs/                                           # Architecture decisions, API docs, notes
├── .gitignore
└── README.md
```

---

## Rule 1 — Folder Structure Is Non-Negotiable

- Never create files outside the structure above.
- `services/landing/` and `services/dashboard/` are completely isolated. A component from landing never gets imported into dashboard and vice versa.
- There is no shared component folder between the two services. If something is genuinely needed in both, it gets copied — not shared via import. The services must remain independently deployable.
- Page files (`page.tsx`, `layout.tsx`) only assemble components. No business logic, no inline styles, no API calls inside page files.
- If a new folder is needed, document it here first, explain why, then create it.

---

## Rule 2 — Where to Write Which Code

Use this as a lookup before creating any file.

| What you are building | Where it goes |
|---|---|
| A landing page UI section | `services/landing/client/src/components/` |
| The landing page assembled | `services/landing/client/src/app/page.tsx` |
| Landing global styles and CSS variables | `services/landing/client/src/app/globals.css` |
| Landing API call helpers | `services/landing/client/src/lib/api.ts` |
| Landing TypeScript types | `services/landing/client/src/types/index.ts` |
| Landing frontend env config | `services/landing/client/src/config/index.ts` |
| Landing Hono route handler | `services/landing/api/src/routes/name.route.ts` |
| Landing business logic | `services/landing/api/src/services/name.service.ts` |
| Landing backend env config | `services/landing/api/src/config/index.ts` |
| A dashboard UI component | `services/dashboard/client/src/components/` |
| The dashboard assembled | `services/dashboard/client/src/app/page.tsx` |
| Dashboard global styles and CSS variables | `services/dashboard/client/src/app/globals.css` |
| Dashboard API call helpers | `services/dashboard/client/src/lib/api.ts` |
| Dashboard TypeScript types | `services/dashboard/client/src/types/index.ts` |
| Dashboard frontend env config | `services/dashboard/client/src/config/index.ts` |
| Dashboard Hono route handler | `services/dashboard/api/src/routes/name.route.ts` |
| Dashboard business logic | `services/dashboard/api/src/services/name.service.ts` |
| Dashboard backend env config | `services/dashboard/api/src/config/index.ts` |
| Static images / OG images | `{service}/client/public/assets/images/` |
| Self-hosted fonts | `{service}/client/public/assets/fonts/` |

**The Hono backend handles:** form submission, data persistence, auth validation, any server-side logic.
**The Next.js frontend handles:** rendering, user interaction, calling its own Hono backend via `lib/api.ts`.

---

## Rule 3 — Delete All Dead Code

When you edit a file, scan the entire file before saving. Remove:

- Unused imports
- Commented-out code blocks (if they were real code, not documentation)
- Variables declared but never used
- Functions defined but never called
- Props typed but never passed
- CSS classes defined in globals.css but not referenced anywhere
- Old component versions left behind after a refactor

Dead code is not a backup. Git is the backup. If it is not being used right now, delete it.

---

## Rule 4 — globals.css Is the Only Source of Styles

Each service has its own `globals.css`. There are two of them — one at `services/landing/client/src/app/globals.css` and one at `services/dashboard/client/src/app/globals.css`. They are the sole source of CSS variables and global styles for their respective service.

### What goes in globals.css

```css
:root {
  /* Color palette */
  --color-cream:       #F4F1EB;
  --color-cream-2:     #E8E4DB;
  --color-white:       #FDFCF9;
  --color-ink:         #1A1714;
  --color-ink-muted:   #7A736C;
  --color-amber:       #C07830;
  --color-amber-lt:    #D08A44;
  --color-dark:        #12100E;
  --color-dark-2:      #1C1916;
  --color-dark-3:      #252119;

  /* Typography */
  --font-display:  'Cormorant', serif;
  --font-body:     'Inter', sans-serif;
  --font-size-xs:  11px;
  --font-size-sm:  13px;
  --font-size-md:  16px;
  --font-size-lg:  20px;

  /* Spacing scale */
  --space-xs:   8px;
  --space-sm:   16px;
  --space-md:   24px;
  --space-lg:   48px;
  --space-xl:   80px;
  --space-2xl:  104px;

  /* Layout */
  --page-padding-x: 52px;
  --max-width:      1200px;

  /* Transitions */
  --transition-fast:   0.15s ease;
  --transition-base:   0.2s ease;
  --transition-slow:   0.3s ease;
}
```

### Hard rules

- Never write a hardcoded hex value like `color: #C07830` in a component. Always use the variable: `color: var(--color-amber)`.
- Never hardcode a pixel value for spacing or font size if a CSS variable exists for it.
- Never create a second stylesheet inside a service. One globals.css per service.
- CSS Modules (`.module.css`) are permitted for component-level class names but all token values inside them must come from the CSS variables in globals.css.
- Inline `style={{}}` in JSX is only acceptable for genuinely dynamic values (a width calculated from state, etc.). Static styles always go in the stylesheet.

---

## Rule 5 — Config Routing: .env → config → usage

No component, service, or route reads from `process.env` directly. All environment values flow through the `config/index.ts` file of that service.

### Frontend pattern (same in both services)

```
.env.local  →  src/config/index.ts  →  imported in lib/api.ts or components
```

### Backend pattern (same in both services)

```
.env  →  src/config/index.ts  →  imported in routes and services
```

### What this means in practice

- Add new env variable to the `.env.local` or `.env` of the relevant service.
- Add it to that service's `config/index.ts` with a proper type.
- Use it everywhere via `config.x.y` — never `process.env.X` outside of the config file.
- Never hardcode a URL, port, email address, API key, or external service name anywhere except the config file.

---

## Rule 6 — Keep This File Updated

Whenever you make a decision that affects how code is written or structured, add it to this file before finishing the task.

This includes:
- A new folder added to the structure
- A new naming convention
- A library added and why it was chosen
- A pattern adopted or explicitly rejected
- Any architectural decision a future session would otherwise have to re-derive

Add new decisions under **"## Architecture Decisions"** at the bottom.

```
### [Date] — [Short title]
What was decided and why. What the alternative was and why it was rejected.
```

---

## Rule 7 — OOP and SOLID Principles

All TypeScript code follows object-oriented design and SOLID principles.

### Single Responsibility
Every class, component, and function does exactly one thing.
- A component renders UI. It does not fetch data or contain business logic.
- A service function handles one operation. It does not also validate, format, and log in the same body.
- A route handler validates the request and calls a service. Business logic never lives in route handlers.

### Open/Closed
Code is open for extension, closed for modification.
- Design components to accept props that make them reusable without editing the component itself.
- If an `if (variant === 'x')` block appears a third time inside a component, the component needs to be split.

### Liskov Substitution
Subtypes must be substitutable for their base types without breaking anything.
- If a base interface defines a contract, every implementation must honour it completely.

### Interface Segregation
No component or class should depend on props or methods it does not use.
- Split large prop interfaces into smaller focused ones.
- A `Button` component does not have a prop for `feedbackFormData` just because one use case needs it. Use composition.

### Dependency Inversion
High-level modules depend on abstractions, not concrete implementations.
- Components depend on typed interfaces, not raw API response shapes.
- Services depend on a repository interface, not directly on a database client.
- Swapping the feedback delivery method (email → database → Slack) means only the implementation changes — not the service interface.

---

## Landing Page — Component Map

`services/landing/client/src/app/page.tsx` assembles these components in order:

| Component | File | What it renders |
|---|---|---|
| `Nav` | `components/Nav.tsx` | Sticky top navigation |
| `Hero` | `components/Hero.tsx` | Full-viewport opener, headline, CTA |
| `Model` | `components/Model.tsx` | The four departments grid |
| `Phases` | `components/Phases.tsx` | Five-phase vision — sticky left, scrolling right |
| `StatStrip` | `components/StatStrip.tsx` | Four stats bar on dark background |
| `FeedbackForm` | `components/FeedbackForm.tsx` | Feedback collection form on dark background |
| `Footer` | `components/Footer.tsx` | Links, contact, build status |

`page.tsx` contains no logic, no styles, and no state. It only imports and arranges these components.

---

## Naming Conventions

| What | Convention | Example |
|---|---|---|
| React component files | PascalCase `.tsx` | `FeedbackForm.tsx` |
| Hook files | `useName.ts` | `useFormSubmit.ts` |
| Service files | `name.service.ts` | `feedback.service.ts` |
| Route files | `name.route.ts` | `feedback.route.ts` |
| Middleware files | `name.middleware.ts` | `auth.middleware.ts` |
| Type/interface names | PascalCase | `FeedbackPayload` |
| Config export | default export named `config` | `export default config` |
| CSS variable names | `--category-name` | `--color-amber`, `--space-lg` |

---

## Architecture Decisions

### June 2026 — Two services, two deployments
`epochcrew-web` was restructured from a single Next.js app with route groups into two fully independent services: `services/landing/` and `services/dashboard/`. Each has its own frontend and backend.

`epochcrew.com` is deployed from `services/landing/`. `dashboard.epochcrew.com` is deployed from `services/dashboard/`. They are deployed independently so that a failure or redeployment of one has zero impact on the other.

The previous approach (single Next.js app with `(landing)` and `(dashboard)` route groups) was rejected because it created unnecessary coupling — a dashboard bug could take down the public-facing site, and a full rebuild was required even when only one surface changed.

### June 2026 — Cormorant + Inter type pairing
Cormorant serif for all display headings. Inter for all body text, labels, and UI elements. Defined as `--font-display` and `--font-body` in globals.css. Do not introduce a third typeface without updating this file.

### June 2026 — Landing page color palette
Warm dark hero (`--color-dark`) with cream body (`--color-cream`) and amber accent (`--color-amber`). Hex values are locked in globals.css. Never change colors in component files — change the variable and it propagates everywhere.

### June 2026 — Feedback form backend
The landing feedback form POSTs to `services/landing/api` at `POST /feedback`. The route validates the payload and delegates to `feedback.service.ts`. The component only calls `lib/api.ts` and has no knowledge of what happens to the data on the backend.