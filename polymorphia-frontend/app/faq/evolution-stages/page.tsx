"use client"

import {useEffect, useState} from "react";
import Slider from "@/components/slider/Slider";
import FaqService from "@/services/faq/FaqService";
import {EvolutionStageSlide} from "@/interfaces/slider/SliderInterfaces";

export default function EvolutionStages() {
  const [slides, setSlides] = useState<EvolutionStageSlide[]>([]);

  useEffect(() => {
    FaqService.getAnimals().then(response => setSlides(response));
  }, []);

  return (
      <Slider slides={slides}/>
  )
}