import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";

export const KnowledgeBaseTypes = {
  CHEST: "CHEST",
  ITEM: "ITEM",
  EVOLUTION_STAGE: "EVOLUTION_STAGE",
} as const;

export type KnowledgeBaseType =
  (typeof KnowledgeBaseTypes)[keyof typeof KnowledgeBaseTypes];

export interface SingleSlideProps {
  slide: KnowledgeBaseResponseDTO;
  position: number;
  prevSlideAction: () => void;
  nextSlideAction: () => void;
}

export interface SliderProps {
  slides: KnowledgeBaseResponseDTO[];
  initialSlide?: number;
}

export interface DetailedSlideInfoProps {
  type: KnowledgeBaseType;
  relatedRewards: KnowledgeBaseResponseDTO["relatedRewards"];
}

export interface NavigationDotsProps {
  slides: KnowledgeBaseResponseDTO[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}
