import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
import { API_HOST } from "@/services/api";

const KnowledgeBaseService = {
  getEvolutionStages: async (
    courseId: number
  ): Promise<KnowledgeBaseResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/courses/${courseId}/evolution-stages`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch evolution stages!");
    }

    return await response.json();
  },

  getItems: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    const response = await fetch(`${API_HOST}/courses/${courseId}/items`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch items!");
    }

    return await response.json();
  },

  getChests: async (courseId: number): Promise<KnowledgeBaseResponseDTO[]> => {
    const response = await fetch(`${API_HOST}/courses/${courseId}/chests`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chests");
    }

    return await response.json();
  },
};

export default KnowledgeBaseService;
