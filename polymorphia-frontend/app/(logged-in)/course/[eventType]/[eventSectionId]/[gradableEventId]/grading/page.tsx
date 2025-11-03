"use client";
import { TargetProvider } from "@/providers/target";
import { GradingProvider } from "@/providers/grading";
import Grading from "@/views/grading";

export default function GradingView() {
  return (
    <TargetProvider>
      <GradingProvider>
        <Grading />
      </GradingProvider>
    </TargetProvider>
  );
}
