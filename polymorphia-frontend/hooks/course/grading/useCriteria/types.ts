import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";

export interface UseCriteria {
  data: CriterionResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
