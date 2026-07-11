import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/Button";
import codingImg from "@/public/coding.png";
import marketingImg from "@/public/marketing.png";
import salesImg from "@/public/sales.png";
import customerImg from "@/public/customer.png";

/**
 * "Meet your AI team" section. A stack of full-width agent panels that pin to
 * the top and slide over one another as you scroll (sticky stacking), so each
 * crew member is revealed in turn. Every color/font comes from the design
 * tokens in globals.css, so the whole thing tracks the light/dark theme.
 */

type Member = {
  name: string;
  title: string;
  summary: string;
  capabilities: { heading: string; detail: string }[];
  /** Small stroked glyph shown in the demo card + section icon. */
  icon: ReactNode;
  /** Illustration shown in the panel's left box. Static import so Next can
      auto-generate the blur-up placeholder. */
  image: StaticImageData;
  /** Label + status shown on the floating "agent canvas" mock. */
  canvas: { title: string; status: string; task: string; rows: { label: string; tag: string; muted?: boolean }[] };
};

const members: Member[] = [
  {
    name: "Team Nirmaan",
    title: "Product Reliability",
    image: codingImg,
    summary:
      "Nirmaan keeps the product healthy. It detects issues the moment they surface, reproduces the root cause, ships a verified fix, and confirms it holds in production — before most users ever notice.",
    capabilities: [
      { heading: "Detect & triage", detail: "Catches regressions and ranks them by real impact." },
      { heading: "Reproduce & fix", detail: "Isolates the root cause and ships a verified patch." },
      { heading: "Verify in prod", detail: "Confirms the fix holds with live monitoring." },
    ],
    icon: <PathIcon d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4zM9 12l2 2 4-4" />,
    canvas: {
      title: "Issue Tracker",
      status: "Resolving",
      task: "Checkout latency spike",
      rows: [
        { label: "Root cause", tag: "API" },
        { label: "Patch deployed", tag: "v2.3" },
        { label: "Regression tests", tag: "Passing", muted: true },
      ],
    },
  },
  {
    name: "Team Vistaar",
    title: "Marketing",
    image: marketingImg,
    summary:
      "Vistaar expands your reach. It crafts on-brand messaging, launches coordinated campaigns across every channel, and doubles down on whatever's converting — around the clock.",
    capabilities: [
      { heading: "Craft the message", detail: "Writes on-brand copy tuned to each audience." },
      { heading: "Launch everywhere", detail: "Ships coordinated campaigns across channels." },
      { heading: "Optimize live", detail: "Shifts spend toward what's actually working." },
    ],
    icon: <PathIcon d="M4 10v4h4l5 4V6l-5 4H4zM17 8a5 5 0 010 8" />,
    canvas: {
      title: "Campaign Board",
      status: "Live",
      task: "Q3 brand push",
      rows: [
        { label: "Creative approved", tag: "12 assets" },
        { label: "Channels", tag: "5 active" },
        { label: "Best performer", tag: "Reels", muted: true },
      ],
    },
  },
  {
    name: "Team Outreach",
    title: "Sales",
    image: salesImg,
    summary:
      "Outreach keeps the pipeline warm. It sources the right prospects, reaches out where they respond, and follows up on every lead the moment it moves — so nothing slips.",
    capabilities: [
      { heading: "Find prospects", detail: "Sources and scores leads that fit your ICP." },
      { heading: "Reach & respond", detail: "Contacts each lead on their best channel." },
      { heading: "Follow up & close", detail: "Nurtures every deal until it's won." },
    ],
    icon: <PathIcon d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8zM12 11.5a.5.5 0 100 1 .5.5 0 000-1z" />,
    canvas: {
      title: "Pipeline",
      status: "Active",
      task: "Acme Corp — Enterprise",
      rows: [
        { label: "Intro sent", tag: "Day 1" },
        { label: "Demo booked", tag: "Day 3" },
        { label: "Proposal", tag: "Sent", muted: true },
      ],
    },
  },
  {
    name: "Team Remedy",
    title: "Customer Support",
    image: customerImg,
    summary:
      "Remedy answers around the clock, resolves the routine instantly, and escalates only what genuinely needs a human — with the full context already attached.",
    capabilities: [
      { heading: "Always on", detail: "Zero wait time, every hour of every day." },
      { heading: "Resolve & deflect", detail: "Closes the common cases before they queue." },
      { heading: "Smart escalation", detail: "Hands off with a summary the moment it's needed." },
    ],
    icon: <PathIcon d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />,
    canvas: {
      title: "Support Inbox",
      status: "Online",
      task: "Refund request",
      rows: [
        { label: "Intent detected", tag: "Billing" },
        { label: "Policy matched", tag: "Auto" },
        { label: "Human review", tag: "Not needed", muted: true },
      ],
    },
  },
];

export function MeetTheTeam() {
  return (
    <section id="team" className="relative isolate bg-background">
      {/* Blurred partition where the section begins — a frosted seam that sits
          over the base of the hero above and melts into the section's
          background, so the crew emerges with no hard line (echoes the footer). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 -translate-y-full bg-gradient-to-b from-transparent via-background/50 to-background backdrop-blur-lg"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>The Crew &middot; 4 Teams</span>
          </div>
          <h2 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-foreground">Always-On, </span>
            <span className="text-primary">Never Off.</span>
          </h2>
        </div>
      </div>

      {/* Sticky stack: each panel pins near the top and the next slides over it. */}
      <div
        className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28"
        // Header strip height — the collapsed size each panel shrinks to, and
        // the vertical step between pinned panels in the stack.
        style={{ ["--team-header-h" as string]: "6.75rem" }}
      >
        <div>
          {members.map((m, i) => (
            <div
              key={m.name}
              className="sticky pb-6 sm:pb-8"
              // Each panel pins a little less than one header-height lower than
              // the last, so as the stack builds every earlier panel collapses
              // toward its header strip while the next rides slightly over it.
              style={{ top: `calc(6rem + ${i} * (var(--team-header-h) - 1.5rem))` }}
            >
              <AgentPanel member={m} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One agent's stacked panel: a demo canvas on the left, capabilities on the right. */
function AgentPanel({ member, index }: { member: Member; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-md border border-border bg-background transition-colors duration-300 hover:border-primary/40">
      {/* Panel header — the strip each panel collapses to in the stack. Holds
          the name and a compact capabilities row (revealed from lg up). */}
      <div
        className="flex items-stretch border-b border-border px-6 sm:px-10"
        style={{ height: "var(--team-header-h)" }}
      >
        {/* Left — name, fixed to half the width so columns align across cards */}
        <div className="flex w-full min-w-0 items-center gap-3 pr-6 lg:w-1/2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <h3 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {member.name}
            <span className="hidden text-muted-foreground/50 sm:inline">
              {" "}&mdash; {member.title}
            </span>
          </h3>
        </div>

        {/* Right — three equal capability columns with vertical dividers. */}
        <div className="hidden w-1/2 grid-cols-3 lg:grid">
          {member.capabilities.map((cap) => (
            <div
              key={cap.heading}
              className="flex min-w-0 flex-col justify-center border-l border-border px-5"
            >
              <p className="truncate text-sm font-semibold text-foreground">
                {cap.heading}
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                {cap.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Panel body */}
      <div className="relative grid gap-8 p-6 sm:p-10 lg:min-h-[30rem] lg:grid-cols-2 lg:gap-12 lg:p-12">
        {/* Oversized ghost index — a quiet watermark behind the content. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-2 select-none text-[7rem] font-bold leading-none tracking-tighter text-muted-foreground/[0.06] sm:text-[9rem]"
        >
          0{index + 1}
        </span>

        {/* Left — team illustration from /public */}
        <div className="relative min-h-[18rem] overflow-hidden rounded-md border border-border lg:min-h-full">
          <Image
            src={member.image}
            alt={`${member.name} — ${member.title}`}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>

        {/* Right — capabilities */}
        <div className="relative flex flex-col">
          <p className="text-pretty text-base leading-relaxed text-foreground/90 sm:text-lg">
            {member.summary}
          </p>

          {/* Capabilities — shown here on small screens where the header row
              hides them; on lg+ they live in the peeking header strip instead. */}
          <ul className="mt-8 space-y-6 lg:hidden">
            {member.capabilities.map((cap) => (
              <li key={cap.heading} className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {cap.heading}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {cap.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 lg:mt-auto lg:pt-8">
            <Button href="#portfolio" size="md" className="group">
              Explore {member.name}
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Small stroked line-icon used inside the demo canvas. */
function PathIcon({ d }: { d: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/** Trailing arrow on the CTA; nudges right on hover of the button group. */
function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
