# CLAUDE.md — epochcrew-web

This file is the source of truth for how code is written in this repository.
Read it fully before touching anything. Update it whenever you make a decision that future sessions need to know about.

---

## Repository Purpose

`epochcrew-web` serves two distinct surfaces:

- **epochcrew.com** — Public landing page. Not customer-facing in a transactional sense. Communicates the vision, collects early feedback.
- **dashboard.epochcrew.com** — Internal dashboard. Used by the Epoch Crew team to monitor agent activity, task feeds, and company health across all child companies.

Both surfaces live in a single Next.js client. They share components where appropriate but have completely separate route groups.

---

## Folder Structure — Strict Adherence Required

Never create files outside this structure. If a new folder is genuinely needed, add it here first.

```
epochcrew-web/
│
├── services/
│   │
│   ├── client/                             # Next.js — all frontend code lives here
│   │   ├── public/
│   │   │   └── assets/
│   │   │       ├── images/                 # Static images (logos, OG images, illustrations)
│   │   │       └── fonts/                  # Self-hosted font files if needed
│   │   │
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── globals.css             # THE ONLY place for CSS variables and global styles
│   │   │   │   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   │   │   │   │
│   │   │   │   ├── (landing)/              # Route group for epochcrew.com
│   │   │   │   │   ├── page.tsx            # Assembles landing section components
│   │   │   │   │   └── layout.tsx          # Landing-specific layout (nav, meta)
│   │   │   │   │
│   │   │   │   └── (dashboard)/            # Route group for dashboard.epochcrew.com
│   │   │   │       ├── page.tsx            # Assembles dashboard components
│   │   │   │       └── layout.tsx          # Dashboard-specific layout (sidebar, auth guard)
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── landing/                # Components used ONLY on the landing page
│   │   │   │   │   ├── Hero.tsx
│   │   │   │   │   ├── Model.tsx           # The four departments / shared services section
│   │   │   │   │   ├── Phases.tsx          # The five-phase vision section
│   │   │   │   │   ├── StatStrip.tsx       # The four stats bar between phases and form
│   │   │   │   │   ├── FeedbackForm.tsx    # The feedback collection section
│   │   │   │   │   ├── Nav.tsx             # Sticky nav (landing variant)
│   │   │   │   │   └── Footer.tsx
│   │   │   │   │
│   │   │   │   ├── dashboard/              # Components used ONLY on the dashboard
│   │   │   │   │   ├── AgentStatus.tsx
│   │   │   │   │   ├── CompanyToggle.tsx
│   │   │   │   │   └── TaskFeed.tsx
│   │   │   │   │
│   │   │   │   └── common/                 # Components shared across landing AND dashboard
│   │   │   │       └── (shared components go here)
│   │   │   │
│   │   │   ├── config/
│   │   │   │   └── index.ts                # Reads .env.local → exports typed config object
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   └── api.ts                  # API call helpers (calls the Hono backend)
│   │   │   │
│   │   │   └── types/
│   │   │       └── index.ts                # All shared TypeScript types and interfaces
│   │   │
│   │   ├── .env.local                      # Raw env values — never imported directly in code
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                                # Hono Backend — all backend code lives here
│       ├── src/
│       │   ├── routes/
│       │   │   ├── dashboard.route.ts      # Route handler — calls service, returns response
│       │   │   ├── feedback.route.ts       # Route handler for landing page feedback form
│       │   │   └── index.ts                # Mounts all routes
│       │   │
│       │   ├── middleware/
│       │   │   ├── auth.middleware.ts
│       │   │   └── cors.middleware.ts
│       │   │
│       │   ├── services/
│       │   │   ├── dashboard.service.ts    # Business logic for dashboard
│       │   │   └── feedback.service.ts     # Business logic for feedback submission
│       │   │
│       │   ├── config/
│       │   │   └── index.ts                # Reads .env → exports typed config object
│       │   │
│       │   └── index.ts                    # Hono app entry point
│       │
│       ├── .env
│       ├── Dockerfile
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                                   # Architecture decisions, API docs, notes
├── .env                                    # Root-level env (Docker Compose, shared values)
├── .gitignore
└── README.md
```

---

## Rule 1 — Folder Structure Is Non-Negotiable

- **Do not** create files at arbitrary locations.
- If a component is only used on the landing page, it goes in `components/landing/`.
- If a component is only used on the dashboard, it goes in `components/dashboard/`.
- If a component is shared across both, it goes in `components/common/`.
- If you need a folder that does not exist in this structure, add it to this CLAUDE.md first, explain why, then create it.
- Page files (`page.tsx`, `layout.tsx`) only assemble components — they contain no business logic and no inline styles.

---

## Rule 2 — Where to Write Which Code

Use this as a lookup before creating any file.

| What you are building | Where it goes |
|---|---|
| A section of the landing page (Hero, Form, etc.) | `client/src/components/landing/` |
| A piece of the dashboard UI | `client/src/components/dashboard/` |
| A UI element used in both landing and dashboard | `client/src/components/common/` |
| The landing page assembled from its sections | `client/src/app/(landing)/page.tsx` |
| The dashboard assembled from its sections | `client/src/app/(dashboard)/page.tsx` |
| Global CSS variables, resets, base typography | `client/src/app/globals.css` — nowhere else |
| A function that calls the Hono API | `client/src/lib/api.ts` |
| A shared TypeScript type or interface | `client/src/types/index.ts` |
| Frontend env config (reads `.env.local`) | `client/src/config/index.ts` |
| A Hono route handler | `api/src/routes/name.route.ts` |
| Business logic called by a route | `api/src/services/name.service.ts` |
| Auth, CORS, or request middleware | `api/src/middleware/name.middleware.ts` |
| Backend env config (reads `.env`) | `api/src/config/index.ts` |
| Static images, icons, OG images | `client/public/assets/images/` |
| Self-hosted fonts | `client/public/assets/fonts/` |

**The backend (Hono) handles:** form submission, data persistence, auth validation, any server-side logic.
**The frontend (Next.js) handles:** rendering, user interaction, calling the Hono API via `lib/api.ts`.

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

## Rule 4 — global.css Is the Only Source of Styles

`client/src/app/globals.css` is the single source of truth for all visual tokens.

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

- **Never** write a hardcoded hex value like `color: #C07830` inside a component file or inline style. Always use the variable: `color: var(--color-amber)`.
- **Never** write a hardcoded pixel value for spacing or font size in a component if a CSS variable exists for it.
- **Never** create a second stylesheet. There is one: `globals.css`.
- CSS Modules (`.module.css`) are permitted for component-level class names but all token values inside them must still come from the CSS variables defined in `globals.css`.
- Inline `style={{}}` in JSX is only acceptable for genuinely dynamic values (e.g. a width calculated from state). Static styles always go in the stylesheet.

---

## Rule 5 — Config Routing: .env → config → usage

No component, service, or route is allowed to read from `process.env` directly. All environment values flow through a single config file.

### Frontend config pattern

```
.env.local  →  src/config/index.ts  →  imported in lib/api.ts or components
```

`client/src/config/index.ts`:
```ts
const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL!,
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Epoch Crew',
  },
} as const;

export default config;
```

Usage anywhere in the frontend:
```ts
import config from '@/config';
fetch(`${config.api.baseUrl}/feedback`);
```

### Backend config pattern

```
.env  →  src/config/index.ts  →  imported in routes and services
```

`api/src/config/index.ts`:
```ts
const config = {
  port: Number(process.env.PORT ?? 3001),
  database: {
    url: process.env.DATABASE_URL!,
  },
  cors: {
    origin: process.env.CORS_ORIGIN!,
  },
} as const;

export default config;
```

### What this means in practice

- If you need a new env variable, add it to `.env.local` (or `.env` for backend), add it to the corresponding `config/index.ts`, then use it via `config.x.y` everywhere.
- Never write `process.env.NEXT_PUBLIC_API_URL` in a component file. That belongs in config.
- Never hardcode a URL, port, API endpoint, email address, or external service key anywhere except the config file.

---

## Rule 6 — Keep This File Updated

Whenever you make a decision that affects how code is written or structured, add it to this file before finishing the task.

This includes:
- A new folder added to the structure (add it to the tree above with a comment)
- A new naming convention introduced
- A new library added and why it was chosen over alternatives
- A pattern adopted (e.g. how forms are handled, how API errors are surfaced)
- A pattern explicitly rejected and why
- Any architectural decision that a future session would otherwise have to re-derive

Put new decisions under an **"## Architecture Decisions"** section at the bottom of this file. Format:

```
### [Date] — [Short title]
What was decided and why. What the alternative was and why it was rejected.
```

---

## Rule 7 — OOP and SOLID Principles

All TypeScript code in this repository follows object-oriented design and SOLID principles.

### Single Responsibility Principle
Every class, component, and function does exactly one thing.

- A component renders UI. It does not fetch data, handle business logic, or manage side effects beyond what is needed to render.
- A service function handles one operation (e.g. `submitFeedback`). It does not also validate, format, and log in the same function body.
- A route handler in Hono validates the request and calls a service. It does not contain business logic itself.

### Open/Closed Principle
Code is open for extension, closed for modification.

- Design components to accept props that make them reusable without editing the component itself.
- If you find yourself adding an `if (variant === 'x')` block inside a component for the third time, the component needs to be split or accept a render prop.

### Liskov Substitution Principle
Subtypes must be substitutable for their base types without breaking the program.

- If you have a base interface `Section` with a `render()` method, every landing page section component must satisfy it completely.
- Do not create a subtype that ignores or overrides base behavior in a way that breaks consumers.

### Interface Segregation Principle
No component or class should be forced to depend on methods or props it does not use.

- Split large prop interfaces into smaller, focused ones.
- A `Button` component should not have a prop for `feedbackFormData` just because one use case needs it. Use composition instead.

### Dependency Inversion Principle
High-level modules depend on abstractions, not on concrete implementations.

- Components depend on typed interfaces, not on specific API response shapes.
- Services depend on a repository/interface, not on the raw database client.
- If you need to swap the feedback delivery mechanism (email → database → Slack), only the implementation changes — not the service interface.

### Applied to React components

```ts
// Wrong — component knows too much, does too much
export const FeedbackForm = () => {
  const [name, setName] = useState('');
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/feedback');  // ← hardcoded
  // ... all logic inline
};

// Correct — single responsibility, config-driven, injectable behaviour
interface FeedbackFormProps {
  onSubmit: (data: FeedbackPayload) => Promise<void>;
  isSubmitting: boolean;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, isSubmitting }) => {
  // Only renders and handles local form state
};
```

---

## Landing Page — Component Map

The landing page (`(landing)/page.tsx`) is built from these components in order:

| Component | File | Section it renders |
|---|---|---|
| `Nav` | `components/landing/Nav.tsx` | Sticky top navigation |
| `Hero` | `components/landing/Hero.tsx` | Full-viewport opener, headline, CTA |
| `Model` | `components/landing/Model.tsx` | The four departments grid |
| `Phases` | `components/landing/Phases.tsx` | Five-phase vision, sticky left / scroll right |
| `StatStrip` | `components/landing/StatStrip.tsx` | Four stats bar (dark background) |
| `FeedbackForm` | `components/landing/FeedbackForm.tsx` | Feedback collection form (dark background) |
| `Footer` | `components/landing/Footer.tsx` | Links, contact, status |

`(landing)/page.tsx` does nothing except import and arrange these components. No logic, no styles, no state.

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

### June 2026 — Initial setup
Chose Next.js App Router for the client. Route groups `(landing)` and `(dashboard)` isolate the two surfaces without requiring separate deployments. Both are served from one Next.js instance but can be split to separate subdomains via `next.config.ts` rewrites.

### June 2026 — Cormorant + Inter type pairing
Cormorant serif is used for all display headings (hero, section titles). Inter is used for all body text, labels, and UI elements. This pairing is defined in `globals.css` as `--font-display` and `--font-body`. Do not introduce a third typeface without updating this file.

### June 2026 — Landing page color palette
The landing page uses a warm dark hero (`--color-dark`) with a cream body (`--color-cream`) and amber accent (`--color-amber`). These are locked in `globals.css`. Do not change hex values in components — change the variable in `globals.css` and it propagates everywhere.

### June 2026 — Feedback form backend
The feedback form POSTs to the Hono API at `POST /feedback`. The `feedback.route.ts` validates the payload and delegates to `feedback.service.ts`. The service is responsible for storage and/or notification. The form component only calls `lib/api.ts` — it has no knowledge of what happens to the data.