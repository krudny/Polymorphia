import { CriterionResponseDTO } from "@/interfaces/api/grade/criteria";
import { API_HOST } from "@/services/api";

export const CriteriaService = {
  getCriteria: async (
    gradableEventId: number
  ): Promise<CriterionResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/criteria?gradableEventId=${gradableEventId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać kryteriów!");
    }

    return await response.json();
  },
};
