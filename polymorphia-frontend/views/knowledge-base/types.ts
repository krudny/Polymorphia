import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";
import { KnowledgeBaseSlideType } from "@/components/slider/types";

export interface KnowledgeBaseSliderViewProps {
  type: KnowledgeBaseSlideType;
}

export interface KnowledgeBaseErrorMessages {
  error: string;
  empty: string;
}

export type KnowledgeBaseHookResult = () => {
  data: KnowledgeBaseResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
};
