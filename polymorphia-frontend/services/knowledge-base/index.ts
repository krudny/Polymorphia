import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
import { apiFetchJson } from "@/services/api/client";

const KnowledgeBaseService = {
  getEvolutionStages: async (
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    return await apiFetchJson<KnowledgeBaseResponseDTO[]>(
      `/knowledge-base/evolution-stages?courseId=${courseId}`
    );
  },

  getItems: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    return await apiFetchJson<KnowledgeBaseResponseDTO[]>(
      `/knowledge-base/items?courseId=${courseId}`
    );
  },

  getChests: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    return await apiFetchJson<KnowledgeBaseResponseDTO[]>(
      `/knowledge-base/chests?courseId=${courseId}`
    );
  },
};

export default KnowledgeBaseService;
