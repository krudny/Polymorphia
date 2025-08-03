import { KnowledgeBaseResponseDTO } from "@/interfaces/api/DTO";

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
  type: KnowledgeBaseResponseDTO["type"];
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
