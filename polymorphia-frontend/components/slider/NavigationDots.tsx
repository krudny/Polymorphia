import {NavigationDotsProps} from "@/interfaces/slider/SliderInterfaces";

export default function NavigationDots({slides, currentSlide, goToSlide}: NavigationDotsProps) {
  return (
      <div className="slider-dots">
        {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${currentSlide === index ? "bg-neutral-600" : "bg-neutral-800"}`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
            />
        ))}
      </div>
  )
}