import { useMemo } from "react";
import toast from "react-hot-toast";
import { gradingStrategyRegistry } from "@/components/column-schema/strategies/grading-strategy/registry";

import { EventType } from "@/interfaces/general";
import { ColumnComponent } from "@/components/column-schema/types";

export function useGradingFactory(type: EventType): ColumnComponent[][] | null {
  return useMemo(() => {
    const selectedStrategy = gradingStrategyRegistry.getStrategy(type);

    if (!selectedStrategy) {
      toast.error("Invalid grading type");
      return null;
    }

    return selectedStrategy.getGradingComponents();
  }, [type]);
}
