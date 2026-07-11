import DomeGallery from "@/components/DomeGallery";

/** Images shown on the dome — sourced from /public. */
const galleryImages = [
  { src: "/coding.png", alt: "Team Nirmaan — Product Reliability" },
  { src: "/marketing.png", alt: "Team Vistaar — Marketing" },
  { src: "/sales.png", alt: "Team Outreach — Sales" },
  { src: "/customer.png", alt: "Team Remedy — Customer Support" },
  { src: "/hero-background.png", alt: "The crew at work" },
  { src: "/footer.png", alt: "Epoch Crew" },
];

/**
 * Interactive 3D dome gallery shown after the team stack. Drag to spin, tap a
 * tile to enlarge it. Colors (overlay + background) come from design tokens so
 * the whole thing tracks the light/dark theme.
 */
export function CrewGallery() {
  return (
    <section id="portfolio" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span>Portfolio</span>
        </div>
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          The crew, in the wild.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Drag to spin the wall &mdash; tap any tile to take a closer look.
        </p>
      </div>

      {/* Fixed-height stage the gallery fills. */}
      <div className="relative mt-10 h-[70vh] w-full sm:h-[80vh]">
        <DomeGallery
          images={galleryImages}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale={false}
          overlayBlurColor="var(--background)"
        />
      </div>
    </section>
  );
}
