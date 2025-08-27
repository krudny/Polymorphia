import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";

export interface UseEvolutionStages {
  data: KnowledgeBaseResponseDTO[] | undefined,
  isLoading: boolean,
  error: Error | null
}