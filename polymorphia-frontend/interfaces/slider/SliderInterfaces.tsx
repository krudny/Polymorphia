export interface Slide {
  id: number,
  bg: string,
  content: string,
}

export interface NavigationDotsProps {
  slides: Slide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
}

export interface SlideComponentProps {
  slide: Slide;
  isActive: boolean;
}