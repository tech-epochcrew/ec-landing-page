"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type TypewriterProps = {
  /** Full string to type out. */
  text: string;
  /** Milliseconds between each character. */
  speed?: number;
  /** Delay before typing starts, in milliseconds. */
  startDelay?: number;
  /** Called once the full string has been typed. */
  onDone?: () => void;
  /** Show the blinking caret. */
  showCursor?: boolean;
  className?: string;
};

/**
 * Reusable typewriter that reveals `text` one character at a time.
 * Respects `prefers-reduced-motion` by showing the full text immediately.
 */
export function Typewriter({
  text,
  speed = 70,
  startDelay = 350,
  onDone,
  showCursor = true,
  className,
}: TypewriterProps) {
  const [shown, setShown] = useState(0);

  // Keep the latest onDone without restarting the animation when it changes.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      setShown(text.length);
      const done = setTimeout(() => onDoneRef.current?.(), 400);
      return () => clearTimeout(done);
    }

    let i = 0;
    let tickTimer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(function tick() {
      i += 1;
      setShown(i);
      if (i < text.length) {
        tickTimer = setTimeout(tick, speed);
      } else {
        onDoneRef.current?.();
      }
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(tickTimer);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={cn(className)} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
      {showCursor && <span aria-hidden="true" className="caret" />}
    </span>
  );
}
