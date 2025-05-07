"use client"

import {useState} from "react";
import NavigationArrow from "@/components/slider/NavigationArrow";
import NavigationDots from "@/components/slider/NavigationDots";
import {SliderProps} from "@/interfaces/slider/SliderInterfaces";
import SingleSlide from "@/components/slider/SingleSlide";
import "../../styles/slider.css";
import {shiftArray} from "@/components/slider/utils";
import {useScaleShow} from "@/animations/General";

export default function Slider({ slides, initialSlide=0 }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const wrapperRef = useScaleShow();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => { setCurrentSlide(index); };

  if (initialSlide != 0) shiftArray(slides, initialSlide - currentSlide);

  return (
      <>
        <div ref={wrapperRef} className="slider-wrapper">
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
            <NavigationArrow direction="left" onClick={prevSlide} className="hidden lg:block z-[999]" />
            <NavigationArrow direction="right" onClick={nextSlide} className="hidden lg:block z-[999]" />
          </div>
        </div>
        <NavigationDots slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
      </>
  );
}