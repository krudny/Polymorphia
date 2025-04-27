export type SliderSlide = EvolutionStageSlide | ItemSlide | ChestSlide;

export interface EvolutionStageSlide {
  type: 'evolution-stage';
  name: string;
  description: string;
  imageUrl: string;
  textGrade: string;
}

export interface ItemSlide {
  type: 'item';
  name: string;
  description: string;
  imageUrl: string;
  textBonus: string;
  chestIds: number[];
}

export interface ChestSlide {
  type: 'chest';
  name: string;
  description: string;
  imageUrl: string;
  textBonus: string;
  rewardsId: number[];
}

export interface SingleSlideProps {
  slide: SliderSlide;
  position: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

export interface SliderProps {
  slides: SliderSlide[];
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




