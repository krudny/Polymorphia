import {
  CriterionResponseDTO,
  CriteriaDetailsRequestDTO,
} from "@/interfaces/api/grade/criteria";

export interface RewardProps {
  criterion: CriterionResponseDTO;
  criterionGrade: CriteriaDetailsRequestDTO;
}

export interface GradingInputProps {
  criterion: CriterionResponseDTO;
  gainedXp: string;
}
