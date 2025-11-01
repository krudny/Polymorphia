import { useMemo } from "react";
import toast from "react-hot-toast";
import { EventType } from "@/interfaces/general";
import { ColumnComponent } from "@/components/column-schema/types";
import { columnSchemaStrategyRegistry } from "@/components/column-schema/strategies/registry";

export function useGradingStrategy(
  type: EventType
): ColumnComponent[][] | null {
  return useMemo(() => {
    const selectedStrategy = columnSchemaStrategyRegistry.getStrategy(type);

    if (!selectedStrategy) {
      toast.error("Nie można pobrać komponentów tego widoku");
      return null;
    }

    return selectedStrategy.getComponents();
  }, [type]);
}
