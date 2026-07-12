"use client";

/** Circular-arrow refresh glyph. */
function RetryIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out group-hover:-rotate-45"
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

/**
 * Re-dispatches the crew by reloading the current route. Client-only because it
 * touches the browser. Styled with the standard surface tokens (not the
 * on-overlay palette) so it reads correctly on the plain 404 background.
 */
export function RetryButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-7 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <RetryIcon />
      Try Again
    </button>
  );
}
