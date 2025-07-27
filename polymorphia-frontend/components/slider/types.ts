import { KnowledgeBaseSlideResponseDTO } from "@/interfaces/api/DTO";

export interface SingleSlideProps {
  slide: KnowledgeBaseSlideResponseDTO;
  position: number;
  prevSlideAction: () => void;
  nextSlideAction: () => void;
}

export interface SliderProps {
  slides: KnowledgeBaseSlideResponseDTO[];
  initialSlide?: number;
}

export interface DetailedSlideInfoProps {
  type: KnowledgeBaseSlideResponseDTO["type"];
  relatedRewards: KnowledgeBaseSlideResponseDTO["relatedRewards"];
}

export interface NavigationDotsProps {
  slides: KnowledgeBaseSlideResponseDTO[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}
