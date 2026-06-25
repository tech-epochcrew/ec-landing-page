import type { IStatStripProps, IStatItem } from "@/types";

function Stat({ item }: { item: IStatItem }) {
  return (
    <div className="stat">
      <div className="stat-num">
        {item.value}
        {item.sup && <sup>{item.sup}</sup>}
      </div>
      <div className="stat-label">
        {item.label.split("\n").map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

/**
 * Stat strip — four metrics bar between the Phases and Feedback sections.
 *
 * SRP  — renders stat items; all data injected via props.
 * DIP  — depends on IStatStripProps; content owned by ContentService.
 * OCP  — add stats in ContentService without modifying this component.
 */
export default function StatStripSection({ content, id, className }: IStatStripProps) {
  return (
    <div id={id} className={`stat-strip${className ? ` ${className}` : ""}`} aria-label="Key metrics">
      {content.stats.map((item) => (
        <Stat key={item.value + item.label} item={item} />
      ))}
    </div>
  );
}
