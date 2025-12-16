"use client";
import { TargetProvider } from "@/providers/target";
import { GradingProvider } from "@/providers/grading";
import useGradingTargets from "@/hooks/course/grading/useGradingTargets";
import GradingView from "@/views/grading";

export default function Grading() {
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
        <GradingView />
      </GradingProvider>
    </TargetProvider>
  );
}
