import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

/**
 * Landing hero: a full-bleed auto-playing video carousel with the navbar
 * layered on top.
 */
export function Landing() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Hero />
      <Navbar />
    </div>
  );
}
