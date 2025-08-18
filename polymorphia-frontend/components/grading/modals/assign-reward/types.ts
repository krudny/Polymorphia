import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";

export interface AssignRewardModalProps {
  assignableRewards: null | CriterionAssignableRewardResponseDTO[];
  onClosedAction: () => void;
}
