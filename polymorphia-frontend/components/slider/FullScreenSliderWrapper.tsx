import Image from "next/image";
import Slider from "@/components/slider/Slider";

export default function FullScreenSliderWrapper() {
  return (
      <div className="w-screen h-screen relative bg-black">
        <Image
            src="/background.png"
            alt="Background"
            fill
            className="absolute object-cover opacity-95"
            priority
        />
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="w-full flex justify-center items-center h-10 md:h-16 text-center">
            <h3 className="text-2xl md:text-4xl">Polymorphia</h3>
          </div>
          <Slider />
        </div>
      </div>
  )
}