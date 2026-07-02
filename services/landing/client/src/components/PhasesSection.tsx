import type { IPhasesSectionProps, IPhase } from "@/types";

function PhaseRow({ phase }: { phase: IPhase }) {
  return (
    <div className="phase-row">
      <div className="phase-num">{phase.num}</div>
      <div className="phase-content">
        <h4>{phase.title}</h4>
        <p>{phase.text}</p>
      </div>
    </div>
  );
}

/**
 * The Vision section — sticky left summary with scrolling phase list on the right.
 *
 * SRP  — renders the phases layout; all content injected via props.
 * DIP  — depends on IPhasesSectionProps abstraction.
 * OCP  — phases are data-driven; add/remove in ContentService without touching this.
 */
export default function PhasesSection({ content, id = "vision", className }: IPhasesSectionProps) {
  return (
    <section id={id} className={`phases-section${className ? ` ${className}` : ""}`}>
      <div className="phases-layout">
        <div className="phases-sticky">
          <div className="section-label">{content.label}</div>
          <h2 className="section-title">
            {content.titleLines.map((line, i) => (
              <span key={i}>{line}{i < content.titleLines.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="section-body">{content.body}</p>
        </div>
        <div className="phases-list">
          {content.phases.map((phase) => (
            <PhaseRow key={phase.num} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
