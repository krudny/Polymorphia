import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";

export type UseKnowledgeBase = {
  data: KnowledgeBaseResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
};
