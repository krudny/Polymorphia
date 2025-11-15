import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";
import { ApiClient } from "@/services/api/client";

export const CriteriaService = {
  getCriteria: async (
    gradableEventId: number
  ): Promise<CriterionResponseDTO[]> => {
    return await ApiClient.get<CriterionResponseDTO[]>(
      `/criteria?gradableEventId=${gradableEventId}`
    );
  },
};
