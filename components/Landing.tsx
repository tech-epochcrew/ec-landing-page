"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";

type Phase = "tagline" | "brand" | "leaving" | "done";

/**
 * Orchestrates the welcome sequence:
 *   1. Type the tagline ("The Crew you will never meet")
 *   2. Crossfade to the brand ("Epoch Crew")
 *   3. Lift the veil to reveal the hero
 */
export function Landing() {
  const [phase, setPhase] = useState<Phase>("tagline");
  const [typed, setTyped] = useState(false);

  // Tagline finished typing -> reveal the brand immediately.
  useEffect(() => {
    if (phase === "tagline" && typed) {
      setPhase("brand");
    }
  }, [phase, typed]);

  // Brand held on screen -> lift the veil.
  useEffect(() => {
    if (phase === "brand") {
      const t = setTimeout(() => setPhase("leaving"), 1600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Hero active={phase === "leaving" || phase === "done"} />
      <Navbar />

      {phase !== "done" && (
        <Intro
          stage={phase === "tagline" ? "tagline" : "brand"}
          leaving={phase === "leaving"}
          onTyped={() => setTyped(true)}
          onExited={() => setPhase("done")}
        />
      )}
    </div>
  );
}
