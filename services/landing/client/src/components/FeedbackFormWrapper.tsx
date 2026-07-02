"use client";

import FeedbackFormSection from "@/components/FeedbackFormSection";
import { submitFeedback } from "@/lib/api";
import type { IFeedbackFormSectionProps, IFeedbackPayload } from "@/types";

async function handleSubmit(data: IFeedbackPayload): Promise<void> {
  await submitFeedback(data);
}

export default function FeedbackFormWrapper(
  props: Omit<IFeedbackFormSectionProps, "onSubmit">
) {
  return <FeedbackFormSection {...props} onSubmit={handleSubmit} />;
}
