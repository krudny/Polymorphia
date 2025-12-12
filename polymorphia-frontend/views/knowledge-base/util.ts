import { KnowledgeBaseErrorMessages } from "@/views/knowledge-base/types";
import {
  KnowledgeBaseSlideType,
  KnowledgeBaseSlideTypes,
} from "@/components/slider/types";

export const KNOWLEDGE_BASE_ERROR_MESSAGES: Record<
  KnowledgeBaseSlideType,
  KnowledgeBaseErrorMessages
> = {
  [KnowledgeBaseSlideTypes.CHEST]: {
    error: "Nie udało się załadować skrzynek.",
    empty: "Skrzynki nie zostały zdefiniowane.",
  },
  [KnowledgeBaseSlideTypes.ITEM]: {
    error: "Nie udało się załadować listy przedmiotów.",
    empty: "Przedmioty nie zostały zdefiniowane.",
  },
  [KnowledgeBaseSlideTypes.EVOLUTION_STAGE]: {
    error: "Nie udało się załadować poziomów ewolucji.",
    empty: "Poziomy ewolucji nie zostały zdefiniowane.",
  },
};
