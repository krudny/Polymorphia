"use client"

import FullScreenSliderWrapper from "@/components/slider/FullScreenSliderWrapper";
import {useEffect, useState} from "react";
import {Slide} from "@/interfaces/slider/SliderInterfaces";
import {fetchData} from "@/config";

export default function Characters() {
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

  return (
      <FullScreenSliderWrapper slides={slides}/>
  )
}