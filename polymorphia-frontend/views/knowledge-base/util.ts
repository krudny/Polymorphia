import useEvolutionStages from "@/hooks/course/useEvolutionStages";
import useChests from "@/hooks/course/useChests";
import useItems from "@/hooks/course/useItems";
import {
  KnowledgeBaseSlideType,
  KnowledgeBaseSlideTypes,
} from "@/interfaces/general";
import {
  KnowledgeBaseErrorMessages,
  KnowledgeBaseHookResult,
} from "@/views/knowledge-base/types";

export const KNOWLEDGE_BASE_SLIDE_HOOKS: Record<
  KnowledgeBaseSlideType,
  KnowledgeBaseHookResult
> = {
  [KnowledgeBaseSlideTypes.CHESTS]: useChests,
  [KnowledgeBaseSlideTypes.ITEMS]: useItems,
  [KnowledgeBaseSlideTypes.EVOLUTION_STAGES]: useEvolutionStages,
};

export const KNOWLEDGE_BASE_ERROR_MESSAGES: Record<
  KnowledgeBaseSlideType,
  KnowledgeBaseErrorMessages
> = {
  [KnowledgeBaseSlideTypes.CHESTS]: {
    error: "Nie udało się załadować skrzynek.",
    empty: "Skrzynki nie zostały zdefiniowane.",
  },
  [KnowledgeBaseSlideTypes.ITEMS]: {
    error: "Nie udało się załadować listy przedmiotów.",
    empty: "Przedmioty nie zostały zdefiniowane.",
  },
  [KnowledgeBaseSlideTypes.EVOLUTION_STAGES]: {
    error: "Nie udało się załadować poziomów ewolucji.",
    empty: "Poziomy ewolucji nie zostały zdefiniowane.",
  },
};
