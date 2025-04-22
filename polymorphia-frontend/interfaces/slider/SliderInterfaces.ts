export interface Slide {
  img_url: string,
  name: string,
  description: string,
}

export interface NavigationDotsProps {
  slides: Slide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

export interface SingleSlideProps {
  slide: Slide;
  position: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

export interface SliderProps {
  slides: Slide[];
}