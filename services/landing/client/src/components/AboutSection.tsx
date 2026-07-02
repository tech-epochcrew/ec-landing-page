import type { ISectionProps } from "@/types";

/**
 * About page section (placeholder, content TBD).
 *
 * ISP  — accepts only the minimal ISectionProps it uses.
 * OCP  — ready to extend with content props without breaking callers.
 */
export default function AboutSection({ id = "about", className }: ISectionProps) {
  return (
    <section id={id} className={`about-section${className ? ` ${className}` : ""}`} />
  );
}
