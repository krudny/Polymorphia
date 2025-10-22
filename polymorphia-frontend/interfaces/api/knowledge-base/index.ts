import { BaseReward } from "@/interfaces/api/reward";
import { KnowledgeBaseType } from "@/components/slider/types";

export interface KnowledgeBaseResponseDTO {
  type: KnowledgeBaseType;
  id: number;
  orderIndex: number;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  relatedRewards?: BaseReward[];
}
