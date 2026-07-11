import { HeroVideos } from "@/components/HeroVideos";
import { cn } from "@/lib/cn";

/**
 * Hero section revealed once the intro veil lifts. Full-bleed auto-playing
 * video carousel with a segmented progress toggle. `active` starts playback
 * only after the intro completes.
 */
export function Hero({ active }: { active: boolean }) {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden">
      <HeroVideos active={active} />

      {/* Bottom scrim so the tagline stays legible over bright clips. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-overlay via-overlay/60 to-transparent" />

      {/* Tagline pinned bottom-left, fading up as the hero is revealed. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-24 z-10 px-4 transition-all duration-700 ease-out sm:bottom-20 sm:px-6",
          active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            {/* Eyebrow: live signal + brand kicker */}
            <div className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.4em] text-accent">
              <span>EpochCrew</span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span>Agentic AI</span>
            </div>

            {/* Statement: emphasis via opacity, not a second color. */}
            <p className="text-pretty text-4xl font-semibold leading-[1.05] tracking-tight text-on-overlay sm:text-[70px]">
              The crew you&rsquo;ll never meet,{" "}
              <span className="text-on-overlay/50">
                running the work you&rsquo;ll never miss.
              </span>
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
