import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";

export interface UseChests {
  data: KnowledgeBaseResponseDTO[] | undefined;
  isLoading: boolean;
  error: Error | null;
}
