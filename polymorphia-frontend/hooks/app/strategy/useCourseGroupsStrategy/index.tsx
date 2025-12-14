import { ColumnComponent } from "@/components/column-schema/types";
import toast from "react-hot-toast";
import { columnSchemaStrategyRegistry } from "@/components/column-schema/strategies/registry";
import { ViewTypes } from "@/interfaces/general";

export function useCourseGroupsStrategy(): ColumnComponent[][] | null {
  const selectedStrategy = columnSchemaStrategyRegistry.getStrategy(
    ViewTypes.COURSE_GROUP
  );

  if (!selectedStrategy) {
    toast.error("Nie można pobrać komponentów tego widoku");
    return null;
  }

  return selectedStrategy.getComponents();
}
