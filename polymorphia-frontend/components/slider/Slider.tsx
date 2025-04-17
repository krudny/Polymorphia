"use client"

import {useState} from "react";
import NavigationArrow from "@/components/slider/NavigationArrow";
import NavigationDots from "@/components/slider/NavigationDots";
import {Slide} from "@/interfaces/slider/SliderInterfaces";
import SingleSlide from "@/components/slider/SingleSlide";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    { id: 1, bg: "bg-blue-500", content: "Slajd 1" },
    { id: 2, bg: "bg-green-500", content: "Slajd 2" },
    { id: 3, bg: "bg-purple-500", content: "Slajd 3" },
    { id: 4, bg: "bg-orange-500", content: "Slajd 4" },
  ];

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
      <div className="flex-1 bg-red-400">
        <div className="h-full relative">
          {slides.map((slide, index) => (
              <SingleSlide key={slide.id} slide={slide} isActive={currentSlide === index} />
          ))}
        </div>

        <NavigationArrow direction="left" onClick={prevSlide} />
        <NavigationArrow direction="right" onClick={nextSlide} />
        <NavigationDots slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
      </div>
  );
}