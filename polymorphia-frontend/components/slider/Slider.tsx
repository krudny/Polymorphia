"use client"

import {useState} from "react";
import NavigationArrow from "@/components/slider/NavigationArrow";
import NavigationDots from "@/components/slider/NavigationDots";
import {SliderProps} from "@/interfaces/slider/SliderInterfaces";
import SingleSlide from "@/components/slider/SingleSlide";
import SliderNavigation from "@/components/slider/SliderNavigation";
import "../../styles/slider.css";


export default function Slider({ slides, initialSlide=0 }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => { setCurrentSlide(index); };

  return (
      <>
        <div className="slider-wrapper">
          <SliderNavigation />
          <div className="slide-wrapper">
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
        <NavigationDots slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
      </>
  );
}