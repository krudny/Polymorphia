"use client"

import {useEffect, useState} from "react";
import Slider from "@/components/slider/Slider";
import FaqService from "@/services/faq/FaqService";
import {ItemSlide} from "@/interfaces/slider/SliderInterfaces";

export default function Items() {
  const [slides, setSlides] = useState<ItemSlide[]>([]);

  useEffect(() => {
    FaqService.getItems().then(response => setSlides(response));
  }, []);

  return (
      <Slider slides={slides}/>
  )
}