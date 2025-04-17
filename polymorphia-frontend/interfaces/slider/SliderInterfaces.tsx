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
}

export interface SlideComponentProps {
  slide: Slide;
  isActive: boolean;
}