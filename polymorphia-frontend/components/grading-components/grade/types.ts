import { CriteriaDetails } from "@/providers/grading/GradingContext";
import { CriterionResponseDTO } from "@/interfaces/api/grade";

export interface RewardProps {
  criterion: CriterionResponseDTO;
  criterionGrade: CriteriaDetails;
}

export interface GradingInputProps {
  criterion: CriterionResponseDTO;
  gainedXp: string;
}
