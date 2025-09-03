import { GradingComponents } from "@/views/course/grading/types";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { gradingStrategyRegistry } from "@/views/course/grading/strategies/Registry";
import { EventType } from "@/interfaces/api/course";

export function useGradingFactory(type: EventType): GradingComponents | null {
  return useMemo(() => {
    const selectedStrategy = gradingStrategyRegistry.getStrategy(type);

    if (!selectedStrategy) {
      toast.error("Invalid grading type");
      return null;
    }

    return selectedStrategy.getGradingComponents();
  }, [type]);
}
