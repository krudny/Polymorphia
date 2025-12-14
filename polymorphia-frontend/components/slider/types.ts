import { KnowledgeBaseResponseDTO } from "@/interfaces/api/knowledge-base";

export const KnowledgeBaseSlideTypes = {
  CHEST: "CHEST",
  ITEM: "ITEM",
  EVOLUTION_STAGE: "EVOLUTION_STAGE",
} as const;

export type KnowledgeBaseSlideType =
  (typeof KnowledgeBaseSlideTypes)[keyof typeof KnowledgeBaseSlideTypes];

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
  type: KnowledgeBaseSlideType;
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
