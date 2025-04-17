"use client"

import {useEffect, useState} from "react";
import {Slide} from "@/interfaces/slider/SliderInterfaces";
import Slider from "@/components/slider/Slider";
import FaqService from "@/services/faq/FaqService";

export default function Animals() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    FaqService.getAnimals().then(response => setSlides(response));
  }, []);

  return (
      <Slider slides={slides}/>
  )
}