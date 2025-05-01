"use client"

import {SingleSlideProps} from "@/interfaces/slider/SliderInterfaces";
import Image from "next/image";
import NavigationArrow from "@/components/slider/NavigationArrow";
import DetailedSlideInfo from "@/components/slider/DetailedSlideInfo";
import clsx from "clsx";
import "../../styles/slider.css";
import {useEffect, useRef} from "react";
import gsap from "gsap";

export default function SingleSlide({ slide, position, prevSlideAction, nextSlideAction, totalSlides}: SingleSlideProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slideElement = sliderRef.current;
    if (!slideElement) return;

    let animatedPosition = position;

    if (position > totalSlides / 2) {
      animatedPosition = position - totalSlides;
    } else if (position < -totalSlides / 2) {
      animatedPosition = position + totalSlides;
    }


    const targetXPercent = animatedPosition * 100;
    const targetOpacity = position === 0 ? 1 : 0;
    const targetScale = position === 0 ? 1 : 0.9;
    const targetZIndex = position === 0 ? 1 : 0;

    gsap.to(slideElement, {
      xPercent: targetXPercent,
      opacity: targetOpacity,
      scale: targetScale,
      zIndex: targetZIndex,
      duration: 0.5,
      ease: "power2.out",
    });

  }, [position, totalSlides]);


  return (
      <div
          className={`carousel-item ${position === 0 ? 'active' : ''}`}
          ref={sliderRef}
      >
        <div className="carousel-image-wrapper">
          <div>
            <Image
                src={`/${slide.imageUrl}`}
                fill
                placeholder="blur"
                blurDataURL="/blur.png"
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

            <div className="slide-details-wrapper">
              {(slide.type === 'item' || slide.type === 'chest') && (
                  <DetailedSlideInfo
                      type={slide.type}
                      ids={slide.type === 'item' ? slide.chestIds : slide.itemIds}
                  />
              )}
            </div>
          </div>
        </div>
      </div>
  )
}