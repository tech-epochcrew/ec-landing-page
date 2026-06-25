"use client";

import { useState } from "react";
import type { IFeedbackFormSectionProps, IFeedbackPayload } from "@/types";

const ROLE_OPTIONS = [
  "Founder / Entrepreneur",
  "Investor / Angel / VC",
  "Engineer / Developer",
  "Business Professional",
  "Researcher / Academic",
  "Student",
  "Just curious",
] as const;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  message: string;
}

interface FieldErrors {
  email: boolean;
  message: boolean;
}

const INITIAL_STATE: FormState = { firstName: "", lastName: "", email: "", role: "", message: "" };
const INITIAL_ERRORS: FieldErrors = { email: false, message: false };

/**
 * Feedback form section — "We're building in public".
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
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role,
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/contact.jpg" alt="" aria-hidden="true" className="feedback-bg-img" />
      <div className="feedback-bg-overlay" />
      <div className="feedback-layout">
        <div>
          <div className="section-label">{content.label}</div>
          <h2 className="section-title">
            {content.titleLines.map((line, i) => (
              <span key={i}>{line}{i < content.titleLines.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="section-body">{content.body}</p>
          <div className="feedback-note">
            Epoch Crew is being built in {content.location}.<br />
            For direct contact:{" "}
            <a href={`mailto:${content.email}`}>{content.email}</a>
          </div>
        </div>

        <div>
          {submitted ? (
            <p className="form-success">✓ Received. We&apos;ll be in touch soon.</p>
          ) : (
            <div className="form-container">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="fname">First Name</label>
                  <input
                    className="form-input"
                    type="text"
                    id="fname"
                    placeholder="Your first name"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lname">Last Name</label>
                  <input
                    suppressHydrationWarning
                    className="form-input"
                    type="text"
                    id="lname"
                    placeholder="Your last name"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  className={`form-input${errors.email ? " err" : ""}`}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="role">You are a…</label>
                <select
                  className="form-select form-input"
                  id="role"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                >
                  <option value="" disabled>Select your background</option>
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Your Thoughts</label>
                <textarea
                  className={`form-textarea${errors.message ? " err" : ""}`}
                  id="message"
                  placeholder="What do you think about the model? Doubts, ideas, questions — anything is welcome."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              <button
                className="form-submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Feedback →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
