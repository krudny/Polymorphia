import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";
import { Context } from "react";
import { TestGradingContextType } from "@/components/providers/grading/GradingContext";

export interface AssignRewardModalProps {
  assignableRewards: null | CriterionAssignableRewardResponseDTO[];
  context: Context<TestGradingContextType>;
  onClosedAction: () => void;
}
