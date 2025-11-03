import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
import { fetchJson, getEndpoint } from "@/services/api/client";

const KnowledgeBaseService = {
  getEvolutionStages: async (
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    return await fetchJson<KnowledgeBaseResponseDTO[]>(
      getEndpoint(`/knowledge-base/evolution-stages?courseId=${courseId}`)
    );
  },

  getItems: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    return await fetchJson<KnowledgeBaseResponseDTO[]>(
      getEndpoint(`/knowledge-base/items?courseId=${courseId}`)
    );
  },

  getChests: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    return await fetchJson<KnowledgeBaseResponseDTO[]>(
      getEndpoint(`/knowledge-base/chests?courseId=${courseId}`)
    );
  },
};

export default KnowledgeBaseService;
