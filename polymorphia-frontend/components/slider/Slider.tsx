"use client"

import {useState} from "react";
import NavigationArrow from "@/components/slider/NavigationArrow";
import NavigationDots from "@/components/slider/NavigationDots";
import {SliderProps} from "@/interfaces/slider/SliderInterfaces";
import SingleSlide from "@/components/slider/SingleSlide";

import Button from "@/components/button/Button";
import Link from "next/link";

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
      <div className="flex-1 text-[#212121]">
        <div className="relative h-full overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center space-x-4 my-4 z-[999]">
            <Link href="/faq/animals"><Button text="Postacie" /></Link>
            <Link href="/faq/items"><Button text="Nagrody" /></Link>
          </div>
          {slides.map((slide, index) => (
              <SingleSlide
                  key={index}
                  slide={slide}
                  position={index - currentSlide}
                  prevSlide={prevSlide}
                  nextSlide={nextSlide}
              />
          ))}
          <div className="absolute bottom-0 w-full">
            <NavigationDots slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
          </div>

          {/* Only desktop arrows */}
          <NavigationArrow direction="left" onClick={prevSlide} className="hidden md:block" />
          <NavigationArrow direction="right" onClick={nextSlide} className="hidden md:block" />
        </div>
      </div>
  );
}