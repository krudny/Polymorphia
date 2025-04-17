import {SlideComponentProps} from "@/interfaces/slider/SliderInterfaces";
import Image from "next/image";

export default function SingleSlide({ slide, isActive }: SlideComponentProps) {
  return (
      <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center md:pb-24 transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col md:flex-row md:justify-between items-center h-full px-6 py-8">
          <div className="w-full md:w-1/2 md:m-20 flex justify-center items-center">
            <div className="relative w-56 h-56  md:w-full md:h-fit md:aspect-square">
              <Image
                  src="/owl.png"
                  alt={slide.name}
                  priority
                  fill
                  className="object-contain md:object-contain"
              />
            </div>
          </div>

          <div className="w-full text-center my-3 md:w-1/2 md:flex md:flex-col md:items-end md:mr-20">
            <h1 className="text-4xl md:text-6xl md:mb-10">{slide.name}</h1>
            <p className="text-xl mt-6 md:mt-0 md:text-3xl text-justify">{slide.description}</p>
          </div>
        </div>
      </div>
  )
}
