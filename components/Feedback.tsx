"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

const empty = { name: "", email: "", feedback: "" };

/** Feedback categories shown as a segmented toggle, each with its own prompt. */
const types = [
  { label: "Have Suggestion", placeholder: "Share an idea to make us better…" },
  { label: "Found Bug", placeholder: "What broke, and how can we reproduce it?" },
  { label: "Contact Us", placeholder: "How can the crew help?" },
] as const;

/**
 * Feedback section shown above the footer. A quiet, editorial two-column layout:
 * an intro on the left and a form card on the right. No backend yet — submitting
 * acknowledges locally with an inline success state.
 */
export function Feedback() {
  const [form, setForm] = useState(empty);
  const [type, setType] = useState<(typeof types)[number]["label"]>(
    types[0].label,
  );
  const [sent, setSent] = useState(false);

  const placeholder =
    types.find((t) => t.label === type)?.placeholder ?? "What's on your mind?";

  function update(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setForm(empty);
  }

  return (
    <section id="feedbacks" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        {/* Category toggle — top of the section. Full-width equal columns on
            phones so the three labels always fit; a centered pill from sm up. */}
        <div className="mb-12 flex justify-center">
          <div className="flex w-full max-w-md gap-1 rounded-xl border border-border bg-muted p-1 sm:inline-flex sm:w-auto sm:max-w-none">
            {types.map((t) => (
              <button
                key={t.label}
                type="button"
                aria-pressed={type === t.label}
                onClick={() => setType(t.label)}
                className={cn(
                  "flex-1 whitespace-nowrap rounded-lg px-2 py-2.5 text-[0.7rem] font-medium transition-colors sm:flex-none sm:px-10 sm:text-sm",
                  type === t.label
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Intro */}
          <div className="max-w-md">
          <div className="mb-5 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.28em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Feedback</span>
          </div>
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tell us what you think.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            The crew is always listening. Share an idea, a question, or a
            critique &mdash; it quietly shapes what we build next.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {sent ? (
            <div
              aria-live="polite"
              className="flex h-full min-h-56 flex-col items-start justify-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-subtle text-primary-subtle-foreground">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Thank you &mdash; we&rsquo;ve got it.
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Your feedback is on its way to the crew.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={update}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={update}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-foreground"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  required
                  value={form.feedback}
                  onChange={update}
                  placeholder={placeholder}
                  className="mt-2 w-full resize-none rounded-xl border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <Button type="submit" size="md" className="w-full sm:w-auto">
                Send feedback
              </Button>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Labeled text input used inside the feedback form. */
function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
