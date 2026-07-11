"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

const links = [
  { label: "The Model", href: "#model" },
  { label: "Our Vision", href: "#vision" },
  { label: "Products", href: "#products" },
  { label: "Feedbacks", href: "#feedbacks" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
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

/**
 * Landing page navigation. A floating frosted-glass pill over the hero video.
 * Links show inline on desktop; on mobile they collapse into a matching glass
 * dropdown behind a menu button.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-10 px-4 pt-4 sm:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* Bar */}
        <nav className="flex items-center justify-between gap-4 rounded-full border border-on-overlay/10 bg-overlay/50 px-3 py-2 shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5 backdrop-blur-xl">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
            onClick={() => setOpen(false)}
          >
            <span className="relative block h-8 w-12 overflow-hidden rounded-lg transition-transform duration-300 ease-out group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Epoch Crew logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="text-lg font-extrabold tracking-wide text-on-overlay">
              Epoch Crew
            </span>
          </Link>

          {/* Desktop links + CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-on-overlay/70 transition-colors duration-200 hover:bg-on-overlay/10 hover:text-on-overlay"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Divider between navigation and the primary action */}
            <span className="mx-1 h-5 w-px bg-on-overlay/15" />
            <Button href="#portfolio" size="sm" className="group">
              View Portfolio
              <ArrowIcon />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-on-overlay/80 transition-colors hover:bg-on-overlay/10 hover:text-on-overlay md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out md:hidden",
            open
              ? "mt-2 max-h-80 opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <ul className="space-y-1 rounded-3xl border border-on-overlay/15 bg-overlay/70 p-2 shadow-lg backdrop-blur-md">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-on-overlay/80 transition-colors hover:bg-on-overlay/10 hover:text-on-overlay"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-1 pt-1">
              <Button
                href="#portfolio"
                size="md"
                className="group w-full"
                onClick={() => setOpen(false)}
              >
                View Portfolio
                <ArrowIcon />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
