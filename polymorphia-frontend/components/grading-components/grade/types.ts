import { CriterionResponseDTO } from "@/interfaces/api/grade";
import { CriteriaDetails } from "@/providers/grading/types";

export interface RewardProps {
  criterion: CriterionResponseDTO;
  criterionGrade: CriteriaDetails;
}

export interface GradingInputProps {
  criterion: CriterionResponseDTO;
  gainedXp: string;
}
