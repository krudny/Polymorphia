"use client"

import {useEffect, useState} from "react";
import NavigationArrow from "@/components/slider/NavigationArrow";
import NavigationDots from "@/components/slider/NavigationDots";
import {Slide} from "@/interfaces/slider/SliderInterfaces";
import SingleSlide from "@/components/slider/SingleSlide";
import {fetchData} from "@/config";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await fetchData<{ characters: Slide[] }>('/animals');
        setSlides(data.characters);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSlides();
  }, []);

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
        <div className="h-full relative">
          {slides.map((slide, index) => (
              <SingleSlide key={index} slide={slide} isActive={currentSlide === index} />
          ))}
        </div>

        <NavigationArrow direction="left" onClick={prevSlide} />
        <NavigationArrow direction="right" onClick={nextSlide} />
        <NavigationDots slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
      </div>
  );
}