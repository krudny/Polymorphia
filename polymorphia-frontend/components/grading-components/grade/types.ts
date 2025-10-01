import {
  CriteriaDetailsRequestDTO,
  CriterionResponseDTO,
} from "@/interfaces/api/grade";

export interface RewardProps {
  criterion: CriterionResponseDTO;
  criterionGrade: CriteriaDetailsRequestDTO;
}

export interface GradingInputProps {
  criterion: CriterionResponseDTO;
  gainedXp: string;
}
