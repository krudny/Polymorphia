import {
  CriteriaDetailsRequestDTO,
  CriterionResponseDTO,
} from "@/interfaces/api/grade/criteria";

export interface CriterionProps {
  criterion: CriterionResponseDTO;
  criterionGrade: CriteriaDetailsRequestDTO;
}
