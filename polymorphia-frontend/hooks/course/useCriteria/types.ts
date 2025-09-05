import { CriterionResponseDTO } from "@/interfaces/api/grade";

export interface UseCriteria {
  data: CriterionResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
