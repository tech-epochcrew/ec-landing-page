"use client";

import { useEffect, useState } from "react";
import type { IFeedbackFormSectionProps, IFeedbackPayload, ITestimonial } from "@/types";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  email: boolean;
  message: boolean;
}

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };
const INITIAL_ERRORS: FieldErrors = { email: false, message: false };
const AUTO_ROTATE_MS = 5000;

/**
 * One-at-a-time testimonial carousel — auto-rotates and supports manual nav.
 *
 * SRP — owns only carousel position/timing; rendering of a single
 *       testimonial is delegated to the caller-supplied list.
 */
function TestimonialCarousel({ testimonials }: { testimonials: ITestimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  function goTo(next: number) {
    setIndex((next + testimonials.length) % testimonials.length);
  }

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-card">
        <div className="testimonial-quote-mark">&ldquo;</div>
        <p className="testimonial-quote">{current.quote}</p>
        <div className="testimonial-author">
          <div className="testimonial-author-name">{current.name}</div>
          <div className="testimonial-author-company">{current.company}</div>
        </div>
      </div>

      <div className="testimonial-controls">
        <button
          type="button"
          className="testimonial-arrow"
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <div className="testimonial-dots">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.name}
              type="button"
              className={`testimonial-dot${i === index ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${testimonial.name}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="testimonial-arrow"
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
}

/**
 * Feedback form section — testimonial carousel alongside a feedback form.
 *
 * SRP  — owns local form state only; submission delegated to onSubmit prop.
 * DIP  — accepts onSubmit as an abstraction so callers control the delivery mechanism.
 * ISP  — onSubmit is optional; the component degrades gracefully without it.
 */
export default function FeedbackFormSection({
  content,
  id = "feedback",
  className,
  onSubmit,
}: IFeedbackFormSectionProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "email" || field === "message") {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  }

  async function handleSubmit() {
    const emailInvalid = !form.email.trim() || !form.email.includes("@");
    const messageInvalid = !form.message.trim();

    if (emailInvalid || messageInvalid) {
      setErrors({ email: emailInvalid, message: messageInvalid });
      return;
    }

    setSubmitting(true);
    try {
      const payload: IFeedbackPayload = {
        name: form.name,
        email: form.email,
        message: form.message,
      };
      await (onSubmit ? onSubmit(payload) : Promise.resolve());
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id={id} className={`feedback-section${className ? ` ${className}` : ""}`}>
      <div className="section-label feedback-heading-label">{content.label}</div>
      <h2 className="section-title feedback-heading-title">
        {content.titleLines.map((line, i) => (
          <span key={i}>{line}{i < content.titleLines.length - 1 && <br />}</span>
        ))}
      </h2>
      <p className="section-body feedback-heading-body">{content.body}</p>

      <div className="feedback-layout">
        <TestimonialCarousel testimonials={content.testimonials} />

        {submitted ? (
          <p className="form-success feedback-form-success">✓ Received. We&apos;ll be in touch soon.</p>
        ) : (
          <div className="feedback-form-container">
            <div className="form-row">
              <input
                className="form-input form-input-pill"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              <input
                className={`form-input form-input-pill${errors.email ? " err" : ""}`}
                type="email"
                placeholder="Your email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <textarea
              className={`form-textarea form-textarea-pill${errors.message ? " err" : ""}`}
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
            <div className="feedback-form-submit-row">
              <button
                className="form-submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Feedback →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
