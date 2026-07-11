"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Hero clips (in `public/`). Order here is the playback order. */
const videos = [
  { src: "/robots-coding.mp4", label: "Code" },
  { src: "/robots-manager.mp4", label: "Manage" },
  { src: "/robots-planning.mp4", label: "Plan" },
  { src: "/robots-support.mp4", label: "Execute" },
];

/**
 * Auto-playing hero video carousel. Plays each clip in turn and advances
 * automatically when one ends, looping back to the first. A segmented progress
 * bar (the "toggle") shows which clip is playing and fills as it plays; each
 * segment is also clickable to jump straight to that clip.
 */
export function HeroVideos({ active }: { active: boolean }) {
  const [current, setCurrent] = useState(0);
  // Playback progress of the current clip, 0..1.
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  function goTo(index: number) {
    setProgress(0);
    setCurrent(((index % videos.length) + videos.length) % videos.length);
  }

  // Only play once the intro is done. Until then, keep the first clip paused on
  // its poster so nothing plays (or advances) behind the intro veil.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      setProgress(0);
    }
  }, [active, current]);

  return (
    <div className="absolute inset-0">
      <video
        // Remounting on `current` swaps the source and restarts playback.
        key={current}
        ref={videoRef}
        className="h-full w-full object-cover"
        src={videos[current].src}
        poster="/hero-background.png"
        muted
        playsInline
        preload="auto"
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
        }}
        onEnded={() => goTo(current + 1)}
      />

      {/* Overlay for readable contrast / cohesion over the clips */}
      <div className="pointer-events-none absolute inset-0 bg-overlay" />

      {/* Scrim behind the navbar so its links stay legible over bright clips. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-overlay to-transparent" />

      {/* Clip index — a labeled, typographic carousel indicator */}
      <div className="absolute inset-x-0 bottom-10 z-10 px-4 sm:px-6">
        <div className="flex items-end justify-end gap-6 sm:gap-8">
          {videos.map((clip, i) => {
              const isActive = i === current;
              return (
                <button
                  key={clip.src}
                  type="button"
                  aria-label={`Play ${clip.label} clip`}
                  aria-current={isActive}
                  onClick={() => goTo(i)}
                  className="group flex min-w-16 flex-col gap-2.5 text-left sm:min-w-20"
                >
                  <span
                    className={cn(
                      "text-xs font-medium tracking-tight transition-colors",
                      isActive
                        ? "text-on-overlay"
                        : "text-on-overlay/45 group-hover:text-on-overlay/75",
                    )}
                  >
                    {clip.label}
                  </span>
                  <span className="relative h-px w-full overflow-hidden rounded-full bg-on-overlay/15">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-200 ease-linear"
                      style={{
                        width: isActive ? `${progress * 100}%` : "0%",
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
  );
}
