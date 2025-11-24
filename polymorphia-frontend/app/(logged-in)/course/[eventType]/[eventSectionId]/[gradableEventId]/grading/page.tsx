"use client";
import { TargetProvider } from "@/providers/target";
import { GradingProvider } from "@/providers/grading";
import Grading from "@/views/grading";
import useGradingTargets from "@/hooks/course/useGradingTargets";

export default function GradingView() {
  return (
    <TargetProvider
      useTargets={useGradingTargets}
      handleApplyFilters={(queryClient) => {
        queryClient.invalidateQueries({
          queryKey: ["gradingTargets"],
        });
      }}
    >
      <GradingProvider>
        <Grading />
      </GradingProvider>
    </TargetProvider>
  );
}
