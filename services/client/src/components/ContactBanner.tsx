import type { IContactSectionProps } from "@/types";

/**
 * Full-width contact banner with an image overlay.
 *
 * DIP  — all display values come in through IContactSectionProps;
 *         this component owns no hardcoded content.
 * ISP  — the IContactContent contract is narrow and focused.
 * LSP  — ISectionProps base fields (id, className) are honoured by
 *         every section component, so they are safely interchangeable.
 */
export default function ContactBanner({
  content,
  id = "contact",
  className,
}: IContactSectionProps) {
  return (
    <div
      id={id}
      className={className}
      style={{ position: "relative", width: "100%", background: "#000000" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.imageSrc}
        alt={content.imageAlt}
        style={{
          width: "100%",
          height: `${content.height}px`,
          objectFit: "fill",
          display: "block",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
    </div>
  );
}
