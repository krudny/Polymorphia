import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
import { ApiClient } from "@/services/api/client";

const KnowledgeBaseService = {
  getEvolutionStages: async (
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    return await ApiClient.get<KnowledgeBaseResponseDTO[]>(
      `/knowledge-base/evolution-stages?courseId=${courseId}`
    );
  },

  getItems: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    return await ApiClient.get<KnowledgeBaseResponseDTO[]>(
      `/knowledge-base/items?courseId=${courseId}`
    );
  },

  getChests: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    return await ApiClient.get<KnowledgeBaseResponseDTO[]>(
      `/knowledge-base/chests?courseId=${courseId}`
    );
  },
};

export default KnowledgeBaseService;
