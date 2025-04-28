export type SliderSlide = EvolutionStageSlide | ItemSlide | ChestSlide;

export interface EvolutionStageSlide {
  type: 'evolution-stage';
  name: string;
  description: string;
  imageUrl: string;
  gradingText: string;
}

export interface ItemSlide {
  type: 'item';
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  textBonus: string;
  chestIds: number[];
}

export interface ChestSlide {
  type: 'chest';
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  behavior: string;
  itemIds: number[];
}

export interface SingleSlideProps {
  slide: SliderSlide;
  position: number;
  prevSlideAction: () => void;
  nextSlideAction: () => void;
}

export interface SliderProps {
  slides: SliderSlide[];
  initialSlide?: number;
}

export interface NavigationDotsProps {
  slides: SliderSlide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}




