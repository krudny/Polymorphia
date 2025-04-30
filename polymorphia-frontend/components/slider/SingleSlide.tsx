"use client"

import {SingleSlideProps} from "@/interfaces/slider/SliderInterfaces";
import Image from "next/image";
import NavigationArrow from "@/components/slider/NavigationArrow";
import DetailedSlideInfo from "@/components/slider/DetailedSlideInfo";
import clsx from "clsx";

export default function SingleSlide({ slide, position, prevSlideAction, nextSlideAction}: SingleSlideProps) {
  return (
      <div
          className={`carousel-item ${position === 0 ? 'carousel-item-active' : 'carousel-item-inactive'}`}
          style={{ transform: `translateX(${position * 100}%)`}}
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

            <div className="relative">
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