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
          <div className="w-full bg-green-200 h-10 text-center">
            Navbar
          </div>
          <Slider />
        </div>
      </div>
  )
}