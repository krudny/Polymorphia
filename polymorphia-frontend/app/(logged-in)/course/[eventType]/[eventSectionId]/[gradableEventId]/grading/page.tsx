"use client";

import { GradingProvider } from "@/providers/grading/GradingContext";
import Grading from "@/views/course/grading";

export default function GradingView() {
  return (
    <GradingProvider>
      <Grading />
    </GradingProvider>
  );
}
