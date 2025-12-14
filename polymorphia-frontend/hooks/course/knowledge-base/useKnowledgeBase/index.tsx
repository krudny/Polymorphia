import useChests from "@/hooks/course/knowledge-base/useChests";
import {
  KnowledgeBaseSlideType,
  KnowledgeBaseSlideTypes,
} from "@/components/slider/types";
import { UseKnowledgeBase } from "@/hooks/course/knowledge-base/useKnowledgeBase/types";
import useItems from "@/hooks/course/knowledge-base/useItems";
import useEvolutionStages from "@/hooks/course/knowledge-base/useEvolutionStages";

export function useKnowledgeBase(
  type: KnowledgeBaseSlideType
): UseKnowledgeBase {
  const chests = useChests();
  const items = useItems();
  const evolutionStages = useEvolutionStages();

  switch (type) {
    case KnowledgeBaseSlideTypes.CHEST:
      return chests;
    case KnowledgeBaseSlideTypes.ITEM:
      return items;
    case KnowledgeBaseSlideTypes.EVOLUTION_STAGE:
      return evolutionStages;
  }
}
