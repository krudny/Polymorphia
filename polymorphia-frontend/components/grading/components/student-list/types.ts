import { TestGradingContextType } from "@/components/providers/grading/test/TestGradingContext";
import { Context } from "react";

export interface StudentListProps {
  context: Context<TestGradingContextType>;
}
