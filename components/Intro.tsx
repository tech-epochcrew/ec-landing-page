"use client";

import { cn } from "@/lib/cn";
import { BackgroundImage } from "@/components/BackgroundImage";
import { Typewriter } from "@/components/Typewriter";

type IntroProps = {
  /** Which line is currently featured. */
  stage: "tagline" | "brand";
  /** When true, the whole veil lifts to reveal the hero. */
  leaving: boolean;
  /** Called once the tagline has finished typing. */
  onTyped: () => void;
  /** Called after the leave transition finishes so the parent can unmount it. */
  onExited: () => void;
};

/**
 * The intro veil. Same background image as the hero under a heavy overlay.
 * Two centered lines crossfade — the typed tagline drifts up and out while the
 * "Epoch Crew" brand rises into focus — then the whole veil lifts away.
 */
export function Intro({ stage, leaving, onTyped, onExited }: IntroProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-6",
        "transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        leaving ? "opacity-0" : "opacity-100",
      )}
      onTransitionEnd={(e) => {
        if (
          leaving &&
          e.target === e.currentTarget &&
          e.propertyName === "opacity"
        ) {
          onExited();
        }
      }}
    >
      <BackgroundImage />

      {/* Heavier veil over the same image */}
      <div className="absolute inset-0 bg-overlay-intro" />

      {/* Overlapping, centered lines that crossfade between stages */}
      <div className="relative z-10 grid place-items-center">
        {/* Line 1 — the tagline */}
        <h1
          className={cn(
            "col-start-1 row-start-1 max-w-6xl text-center text-6xl font-normal tracking-tight text-on-overlay sm:text-8xl md:text-9xl",
            "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            stage === "tagline"
              ? "translate-y-0 opacity-100 blur-0"
              : "-translate-y-4 opacity-0 blur-sm",
          )}
        >
          <Typewriter text="The Crew you will never meet" onDone={onTyped} />
        </h1>

        {/* Line 2 — the brand reveal */}
        <h1
          className={cn(
            "col-start-1 row-start-1 text-center text-6xl font-semibold tracking-tight text-primary sm:text-8xl md:text-9xl",
            "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            leaving
              ? "-translate-y-6 scale-[1.03] opacity-0 blur-md"
              : stage === "brand"
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "translate-y-4 opacity-0 blur-sm",
          )}
        >
          Epoch Crew
        </h1>
      </div>
    </div>
  );
}
