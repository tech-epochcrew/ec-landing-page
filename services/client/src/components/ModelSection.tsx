import type { IModelSectionProps, IModelCard } from "@/types";

function CardIcon({ id }: { id: string }) {
  switch (id) {
    case "manufacturing":
      return (
        <svg className="model-card-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="6" y="6" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
          <rect x="20" y="6" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="20" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
          <rect x="20" y="20" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "marketing":
      return (
        <svg className="model-card-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 28 L12 18 L18 22 L24 12 L30 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="16" r="2" fill="currentColor" />
        </svg>
      );
    case "support":
      return (
        <svg className="model-card-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18 6 C10 6 6 11 6 16 C6 21 10 25 16 25.5 L16 30 L22 25 C28 23 30 19.5 30 16 C30 11 26 6 18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className="model-card-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18 4 L6 9 L6 18 C6 24.6 11.4 30.7 18 32 C24.6 30.7 30 24.6 30 18 L30 9 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

function ModelCard({ card }: { card: IModelCard }) {
  return (
    <div className="model-card">
      <CardIcon id={card.id} />
      <div className="model-card-title">{card.titleLines.join(" ")}</div>
      <p className="model-card-text">{card.text}</p>
      <span className="model-card-tag">{card.tag}</span>
    </div>
  );
}

/**
 * The Model section — four shared-services departments grid.
 *
 * SRP  — renders the model grid; all content injected via props.
 * DIP  — depends on IModelSectionProps abstraction, not on ContentService directly.
 * OCP  — add/remove cards in ContentService without touching this component.
 */
export default function ModelSection({ content, id = "model", className }: IModelSectionProps) {
  return (
    <section id={id} className={`model-section${className ? ` ${className}` : ""}`}>
      <div className="model-header">
        <div>
          <div className="section-label">{content.label}</div>
          <h2 className="section-title">
            {content.titleLines.map((line, i) => (
              <span key={i}>{line}{i < content.titleLines.length - 1 && <br />}</span>
            ))}
          </h2>
        </div>
        <p className="model-intro">{content.intro}</p>
      </div>
      <div className="model-grid">
        {content.cards.map((card) => (
          <ModelCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
