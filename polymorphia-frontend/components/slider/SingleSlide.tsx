import {SlideComponentProps} from "@/interfaces/slider/SliderInterfaces";

export default function SingleSlide({ slide, isActive }: SlideComponentProps) {
  return (
      <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-neutral-100 text-3xl font-bold transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
          } ${slide.bg}`}
      >
        {slide.content}
      </div>
  )
};
