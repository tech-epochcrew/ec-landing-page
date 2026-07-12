import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

/** Footer navigation, grouped. Hrefs mirror the on-page section anchors. */
const columns: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Explore",
      links: [
        { label: "The Model", href: "#model" },
        { label: "Our Vision", href: "#vision" },
        { label: "Products", href: "#products" },
        { label: "Feedbacks", href: "#feedbacks" },
      ],
    },
    {
      heading: "Departments",
      links: [
        { label: "Manufacturing", href: "#model" },
        { label: "Marketing & Sales", href: "#model" },
        { label: "Customer Support", href: "#model" },
        { label: "Regulatory Compliance", href: "#model" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Portfolio", href: "#portfolio" },
        { label: "Vision", href: "#vision" },
        { label: "Contact", href: "mailto:hello@epochcrew.com" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Trust", href: "#trust" },
        { label: "Status", href: "#status" },
        { label: "Press", href: "#press" },
        { label: "Resources Hub", href: "#resources" },
      ],
    },
  ];

/** Social links, shown as a horizontal strip on the last line. */
const socials = [
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

/** Trailing arrow on the CTA; nudges right when the button group is hovered. */
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

/**
 * Site footer. A CTA band, grouped navigation, and a legal bar — all built on
 * design tokens so it tracks the light/dark theme automatically.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden">
      {/* Background illustration */}
      <Image
        src="/footer.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Overlay: brand-tinted scrim so content stays legible over the art.
          Stronger on phones, where `object-cover` zooms the light illustration
          up behind the text; the lighter desktop scrim kicks in from sm up. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/75 to-background/95 sm:via-background/55 sm:to-background/90" />
      {/* Top fade: the artwork emerges out of the feedback section — no seam */}
      <div className="absolute inset-x-0 top-0 -z-10 h-8 bg-gradient-to-b from-background to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* CTA band */}
        <div className="flex flex-col gap-6 border-b border-border py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:py-14">
          <h2 className="max-w-xl text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-[1.1]">
            The Crew you will never meet.
          </h2>
          <Button href="#portfolio" size="lg" className="group shrink-0">
            View Portfolio
            <ArrowIcon />
          </Button>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:grid-cols-3 sm:py-16 md:grid-cols-4 md:gap-8">
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Last line: brand + legal */}
        <div className="flex flex-col gap-4 border-t border-border py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative block h-8 w-12 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Epoch Crew logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="text-lg font-extrabold tracking-wide text-foreground">
                Epoch Crew
              </span>
            </Link>
            <span className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Epoch Crew
            </span>
            <Link
              href="#privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#security"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Security
            </Link>
          </div>

          {/* Social strip */}
          <nav
            aria-label="Social media"
            className="flex items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="transition-colors hover:text-foreground"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
