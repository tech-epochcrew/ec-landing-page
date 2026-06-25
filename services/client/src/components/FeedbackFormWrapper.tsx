"use client";

import dynamic from "next/dynamic";
import type { IFeedbackFormSectionProps } from "@/types";

const FeedbackFormSection = dynamic(
  () => import("@/components/FeedbackFormSection"),
  { ssr: false }
);

export default function FeedbackFormWrapper(props: IFeedbackFormSectionProps) {
  return <FeedbackFormSection {...props} />;
}
