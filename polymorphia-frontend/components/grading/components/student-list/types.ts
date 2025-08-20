import { TestGradingContextType } from "@/components/providers/grading/GradingContext";
import { Context } from "react";

export interface StudentListProps {
  context: Context<TestGradingContextType>;
}
