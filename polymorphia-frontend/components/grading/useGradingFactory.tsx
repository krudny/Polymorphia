import { GradingType } from "@/components/grading/types";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { gradingStrategyRegistry } from "@/components/grading/strategies/Registry";

export function useGradingFactory(type: GradingType) {
  return useMemo(() => {
    const selectedStrategy = gradingStrategyRegistry.getStrategy(type);

    if (!selectedStrategy) {
      toast.error("Invalid grading type");
      return null;
    }

    return selectedStrategy.getGradingComponents();
  }, [type]);
}
