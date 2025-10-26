"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import ProfileProgressBar from "@/components/progressbar/profile";
import { Fragment, useRef } from "react";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import {
  baseSwapAnimationWrapperProps,
  SwapAnimationWrapper,
} from "@/animations/SwapAnimationWrapper";
import { AccordionRef } from "@/providers/accordion/types";
import ImageBadge from "@/components/image-badge/ImageBadge";

export default function StudentSummary() {
  const accordionRef = useRef<AccordionRef>(null);

  const topComponent = () => <h1>Student</h1>;
  const mainComponent = () => (
    <Fragment>
      <Accordion
        ref={accordionRef}
        sectionIds={new Set(["profile", "items", "chests"])}
        initiallyOpenedSectionIds={new Set(["profile"])}
        className="gap-y-5"
        maxOpen={1}
        shouldAnimateInitialOpen={false}
      >
        <AccordionSection
          id="profile"
          title="Profil"
          headerClassName="equipment-accordion-header"
        >
          <SwapAnimationWrapper
            {...baseSwapAnimationWrapperProps}
            keyProp="profile"
          >
            <div className="w-full h-fit my-2">
              <div className="w-full flex">
                <div className="relative aspect-square w-full max-w-[160px]">
                  <Image
                    src={`${API_STATIC_URL}/images/evolution-stages/egg.webp`}
                    alt="Zwierzak użytkownika"
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-col-centered gap-y-2 mx-auto">
                  <h3 className="text-5xl">Krzysztof Ligarski</h3>
                  <h4 className="text-4xl">Gerard Waleczny</h4>
                  <h4 className="text-3xl">4 na 293 osoby w kursie</h4>
                </div>
              </div>
              <div className="w-full px-13 py-4">
                <ProfileProgressBar
                  totalXp={86.8}
                  maxPoints={100}
                  evolutionStages={[
                    {
                      id: 1,
                      name: "Samodzielny Zwierzak",
                      minXp: 80,
                      grade: 4.5,
                    },
                    {
                      id: 1,
                      name: "Samodzielny Zwierzak",
                      minXp: 80,
                      grade: 4.5,
                    },
                  ]}
                  numSquares={2}
                  segmentSizes={[0, 100, 0]}
                  size="md"
                />
              </div>
            </div>
          </SwapAnimationWrapper>
        </AccordionSection>
        <AccordionSection
          key="items"
          id="items"
          title="Przedmioty"
          headerClassName="equipment-accordion-header"
        >
          <SwapAnimationWrapper
            {...baseSwapAnimationWrapperProps}
            keyProp="items"
          >
            <div className="w-full grid grid-cols-3 gap-3">
              {[1, 2, 3, 4].map((i) => {
                return (
                  <div className="relative w-full aspect-square" key={i}>
                    <Image
                      src={`${API_STATIC_URL}/images/items/carrot.webp`}
                      alt="obrazek"
                      fill
                      className="object-cover rounded-2xl shadow-lg"
                      priority
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                    {i > 0 ? (
                      <ImageBadge
                        text={i.toString()}
                        className="text-2xl w-8 rounded-tl-2xl rounded-br-2xl"
                      />
                    ) : (
                      <div className="equipment-locked-item">
                        <span>
                          <p>lock</p>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SwapAnimationWrapper>
        </AccordionSection>

        <AccordionSection
          key="chests"
          id="chests"
          title="Skrzynki"
          headerClassName="equipment-accordion-header"
        >
          <SwapAnimationWrapper
            {...baseSwapAnimationWrapperProps}
            keyProp="chests"
          >
            <div className="w-full grid grid-cols-3 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div className="relative w-full aspect-square" key={i}>
                  <Image
                    src={`${API_STATIC_URL}/images/chests/s1.webp`}
                    alt="name"
                    fill
                    className="object-cover rounded-2xl shadow-lg"
                    priority
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </SwapAnimationWrapper>
        </AccordionSection>
      </Accordion>
    </Fragment>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
