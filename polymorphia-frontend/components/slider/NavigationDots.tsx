import {NavigationDotsProps} from "@/interfaces/slider/SliderInterfaces";

export default function NavigationDots({slides, currentSlide, goToSlide}: NavigationDotsProps) {
  console.log(currentSlide);
  return (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-neutral-300" : "bg-neutral-100"
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
            />
        ))}
      </div>
  )
}