"use client"

import {SingleSlideProps} from "@/interfaces/slider/SliderInterfaces";
import Image from "next/image";
import NavigationArrow from "@/components/slider/NavigationArrow";
import DetailedSlideInfo from "@/components/slider/DetailedSlideInfo";
import clsx from "clsx";
import "../../styles/slider.css";
import {useEffect, useRef} from "react";
import {animateSingleSlide} from "@/animations/Slider";
import { API_STATIC_URL } from "@/services/api";

export default function SingleSlide({ slide, position, prevSlideAction, nextSlideAction}: SingleSlideProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    animateSingleSlide(sliderRef.current, position);
  }, [position]);

  return (
      <div
          className={`carousel-item ${position === 0 ? 'active' : ''}`}
          ref={sliderRef}
      >
        <div className="carousel-image-wrapper">
          <div>
            <Image
                src={`${API_STATIC_URL}/${slide.imageUrl}`}
                fill
                alt={slide.name}
                sizes="(max-width: 1024px) 400px, (max-width: 1920px) 50vw"
                priority
            />
          </div>
        </div>

        <div className={clsx("carousel-content-wrapper")}>
          <div className="carousel-content-inner-wrapper">
            <div className="carousel-content">
              <div>
                <NavigationArrow direction="left" onClick={prevSlideAction} className="lg:hidden"/>
                <NavigationArrow direction="right" onClick={nextSlideAction} className="lg:hidden"/>
                <h1>{slide.name}</h1>
                {(() => {
                  switch (slide.type) {
                    case 'item':
                      return <h2>{slide.textBonus.toLowerCase()}</h2>;
                    case 'evolution-stage':
                      return <h2>{slide.gradingText}</h2>;
                    case 'chest':
                      return <h2>{slide.behavior}</h2>;
                    default:
                      return null;
                  }
                })()}
              </div>
              <p>
                {slide.description}
              </p>
            </div>

            {(slide.type === 'item' || slide.type === 'chest') && (
            <div className="slide-details-wrapper">
                  <DetailedSlideInfo
                      type={slide.type}
                      ids={slide.type === 'item' ? slide.chestIds : slide.itemIds}
                  />
            </div>
            )}
          </div>
        </div>
      </div>
  )
}