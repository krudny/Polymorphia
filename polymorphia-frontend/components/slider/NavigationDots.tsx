import {NavigationDotsProps} from "@/interfaces/slider/SliderInterfaces";

export default function NavigationDots({slides, currentSlide, goToSlide}: NavigationDotsProps) {
  return (
      <div className="w-full h-6 my-2 flex items-center justify-center space-x-2">
        {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-zinc-600" : "bg-[#212121]"
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
            />
        ))}
      </div>
  )
}