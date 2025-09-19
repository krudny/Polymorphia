import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";

export interface AssignRewardModalProps {
  criterionId: number;
  assignableRewards: null | CriterionAssignableRewardResponseDTO[];
  onClosedAction: () => void;
}

export interface AssignRewardModalContentProps {
  criterionId: number;
  assignableRewards: AssignRewardModalProps["assignableRewards"];
  onClosedAction: () => void;
}
