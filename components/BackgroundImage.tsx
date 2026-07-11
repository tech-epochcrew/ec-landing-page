import Image from "next/image";

/**
 * Full-bleed hero background image. Shared by the intro veil and the hero so
 * the image stays perfectly registered as the intro lifts away.
 */
export function BackgroundImage() {
  return (
    <Image
      src="/hero-background.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}
