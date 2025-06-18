import { NavigationDotsProps } from "@/interfaces/slider/SliderInterfaces";
import "../../styles/slider.css";

export default function NavigationDots({
  slides,
  currentSlide,
  goToSlide,
}: NavigationDotsProps) {
  return (
    <div className="slider-dots">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`${currentSlide === index ? "bg-primary-dark dark:bg-secondary-light" : "bg-primary-gray"}`}
          aria-label={`Przejdź do slajdu ${index + 1}`}
        />
      ))}
    </div>
  );
}
