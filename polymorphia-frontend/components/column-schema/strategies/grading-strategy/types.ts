import { ColumnComponent } from "@/components/column-schema/types";

export interface GradingStrategy {
  getGradingComponents: () => ColumnComponent[][];
}
