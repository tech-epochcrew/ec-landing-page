import Image from "next/image";
import { Button } from "@/components/Button";
import { RetryButton } from "@/components/RetryButton";

/**
 * 404 page. The crew robot carries the "page not found" message; below it, a
 * headline and two actions to get back on track. All colors and type come from
 * the design tokens in `globals.css`, so the page tracks the theme.
 */

/** Trailing arrow on the primary CTA; nudges right on group hover. */
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

export default function NotFound() {
  return (
    // Fills exactly one screen: the image is sized against the viewport HEIGHT
    // (max-h) and scales by its own aspect ratio, so heading + image + buttons
    // always fit — from phones to wide monitors — without cropping. The collapse
    // offsets are in `vh` so they track the image at every size.
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-8">
        <div className="flex w-full max-w-[67.6rem] flex-col items-center">
          <h1 className="mb-[1.5vh] max-w-3xl text-balance text-center text-4xl font-semibold leading-[1.08] tracking-tight text-foreground [word-spacing:0.18em] sm:text-6xl">
            <span className="block">Oh, the tragedy!</span>
            <span className="mt-2 block font-normal italic text-muted-foreground">
              The crew is{" "}
              <span className="font-medium not-italic text-primary">
                not trained
              </span>{" "}
              yet.
            </span>
          </h1>

          {/* Robot dispatch portrait — carries the "404 / page not found" */}
          <Image
            src="/404.png"
            alt="An EpochCrew robot holding up a 404 — page not found"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1082px) 90vw, 1082px"
            className="-mt-[3vh] mb-[1vh] h-auto max-h-[56vh] w-auto max-w-full rounded-2xl"
          />

          {/* Actions */}
          <div className="-mt-[3vh] flex flex-wrap items-center justify-center gap-[34px]">
            <Button href="/" size="lg" className="group">
              Go to Home Page
              <ArrowIcon />
            </Button>
            <RetryButton />
          </div>
        </div>
      </main>
  );
}
