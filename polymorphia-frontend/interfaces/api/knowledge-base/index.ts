import { BaseReward } from "../reward";

export type KnowledgeBaseType = "EVOLUTION_STAGE" | "ITEM" | "CHEST";

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
