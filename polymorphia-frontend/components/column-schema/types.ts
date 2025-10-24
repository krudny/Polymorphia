import { ReactNode } from "react";
import { GradingComponent } from "@/views/course/grading/types";

export interface ColumnSchemaProps {
  columns: number;
  components: GradingComponent[][];
}
