"use client"

import {useState} from "react";
import NavigationArrow from "@/components/slider/NavigationArrow";
import NavigationDots from "@/components/slider/NavigationDots";
import {SliderProps} from "@/interfaces/slider/SliderInterfaces";
import SingleSlide from "@/components/slider/SingleSlide";
import Link from "next/link";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";


export default function Slider({slides}: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
      <>
      <div className="flex-1 flex flex-col text-[#212121]">
        <div className="flex justify-center w-full h-fit  space-x-4 mb-3 z-[999]  relative">
          <Link href="/faq/evolution-stages"><ButtonWithBorder text="Postacie" className="text-xl !px-6 !py-1" /></Link>
          <Link href="/faq/items"><ButtonWithBorder text="Nagrody" className="text-xl !px-6 !py-1" /></Link>
        </div>
        <div className="relative w-full h-full flex-1 flex flex-col overflow-x-hidden animate-slideInFromLeft">
          {slides.map((slide, index) => (
              <SingleSlide
                  key={index}
                  slide={slide}
                  position={index - currentSlide}
                  prevSlideAction={prevSlide}
                  nextSlideAction={nextSlide}
              />
          ))}

          <NavigationArrow direction="left" onClick={prevSlide} className="hidden lg:block" />
          <NavigationArrow direction="right" onClick={nextSlide} className="hidden lg:block" />
        </div>
      </div>

      <div className="w-full">
        <NavigationDots slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
      </div>
      </>
  );
}