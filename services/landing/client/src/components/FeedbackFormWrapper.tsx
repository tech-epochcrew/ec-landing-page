"use client";

import dynamic from "next/dynamic";
import { submitFeedback } from "@/lib/api";
import type { IFeedbackFormSectionProps, IFeedbackPayload } from "@/types";

const FeedbackFormSection = dynamic(
  () => import("@/components/FeedbackFormSection"),
  { ssr: false }
);

async function handleSubmit(data: IFeedbackPayload): Promise<void> {
  await submitFeedback(data);
}

export default function FeedbackFormWrapper(
  props: Omit<IFeedbackFormSectionProps, "onSubmit">
) {
  return <FeedbackFormSection {...props} onSubmit={handleSubmit} />;
}
