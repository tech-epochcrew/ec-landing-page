"use client";

import { useEffect, useRef } from "react";
import type { IModelSectionProps, IModelCard } from "@/types";

const STACK_TOP_PX = 96;
const STACK_OFFSET_STEP_PX = 24;
const STACK_SCALE_STEP = 0.03;

function ModelStackCard({
  card,
  index,
  total,
  setCardRef,
}: {
  card: IModelCard;
  index: number;
  total: number;
  setCardRef: (el: HTMLDivElement | null) => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <div
      ref={setCardRef}
      className="model-stack-card"
      style={{ top: `${STACK_TOP_PX + index * STACK_OFFSET_STEP_PX}px`, zIndex: index + 1 }}
    >
      <div className="model-stack-card-head">
        <span className="model-stack-tag">{card.tag}</span>
        <span className="model-stack-count">{num} / {totalLabel}</span>
      </div>
      <div className="model-stack-card-body">
        <div className="model-stack-num">{num}</div>
        <div className="model-stack-text">
          <h3>{card.titleLines.join(" ")}</h3>
          <p>{card.text}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * The Model section — four shared-services departments as a sticky,
 * scale-stacking card scroller (matches the "Vision" scroll treatment).
 *
 * SRP  — renders the model stack; all content injected via props.
 * DIP  — depends on IModelSectionProps abstraction, not on ContentService directly.
 * OCP  — add/remove cards in ContentService without touching this component.
 */
export default function ModelSection({ content, id = "model", className }: IModelSectionProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!cards.length) return;

    const onScroll = () => {
      const total = cards.length;
      cards.forEach((card, i) => {
        if (i === total - 1) {
          card.style.transform = "scale(1)";
          return;
        }
        const target = 1 - (total - 1 - i) * STACK_SCALE_STEP;
        const next = cards[i + 1];
        const myBottom = card.getBoundingClientRect().bottom;
        const nextTop = next.getBoundingClientRect().top;
        const height = card.offsetHeight || 1;
        const progress = Math.min(1, Math.max(0, (myBottom - nextTop) / height));
        card.style.transform = `scale(${(1 - progress * (1 - target)).toFixed(4)})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [content.cards.length]);

  return (
    <section id={id} className={`model-section${className ? ` ${className}` : ""}`}>
      <div className="model-layout">
        <div className="model-sticky">
          <div className="section-label">{content.label}</div>
          <h2 className="section-title">
            {content.titleLines.map((line, i) => (
              <span key={i}>{line}{i < content.titleLines.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="model-intro">{content.intro}</p>
        </div>
        <div className="model-stack">
          {content.cards.map((card, i) => (
            <ModelStackCard
              key={card.id}
              card={card}
              index={i}
              total={content.cards.length}
              setCardRef={(el) => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
