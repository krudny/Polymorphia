import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";

export interface UseItems {
  data: KnowledgeBaseResponseDTO[] | undefined;
  isLoading: boolean;
  error: Error | null;
}
