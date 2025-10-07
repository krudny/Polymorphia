import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";
import { ShortGradeResponseDTO } from "@/interfaces/api/grade/grade";

export interface GradeInfoProps {
  grade: ShortGradeResponseDTO;
  criteria: CriterionResponseDTO[];
}
