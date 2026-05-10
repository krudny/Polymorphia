import { BaseReward } from "@/interfaces/api/reward";
import { KnowledgeBaseSlideType } from "@/components/slider/types";

export interface KnowledgeBaseResponseDTO {
  type: KnowledgeBaseSlideType;
  id: number;
  orderIndex: number;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  relatedRewards?: BaseReward[];
}
