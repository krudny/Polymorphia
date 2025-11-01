import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
import { API_HOST } from "@/services/api";
import { Fetch } from "@/hooks/general/useFetch/types";

const KnowledgeBaseService = {
  getEvolutionStages: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    const response = await fetchFn(
      `${API_HOST}/knowledge-base/evolution-stages?courseId=${courseId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch evolution stages!");
    }

    return await response.json();
  },

  getItems: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    const response = await fetchFn(
      `${API_HOST}/knowledge-base/items?courseId=${courseId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch items!");
    }

    return await response.json();
  },

  getChests: async (
    fetchFn: Fetch,
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    const response = await fetchFn(
      `${API_HOST}/knowledge-base/chests?courseId=${courseId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch chests");
    }

    return await response.json();
  },
};

export default KnowledgeBaseService;
