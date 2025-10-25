"use client";

import ColumnComponent from "@/components/column-schema/column-component";
import { Fragment, useRef } from "react";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import {
  baseSwapAnimationWrapperProps,
  SwapAnimationWrapper,
} from "@/animations/SwapAnimationWrapper";
import { AccordionRef } from "@/providers/accordion/types";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";

export default function EquipmentSummary() {
  const accordionRef = useRef<AccordionRef>(null);
  const wrapperRef = useFadeInAnimate();
  const accordionSections = new Set(["items", "chests"]);

  const topComponent = () => <h1>Ekwipunek</h1>;
  const mainComponent = () => (
    <Fragment>
      <div ref={wrapperRef} className="opacity-0">
        <Accordion
          ref={accordionRef}
          className="grade-accordion-override"
          sectionIds={accordionSections}
          initiallyOpenedSectionIds={accordionSections}
          maxOpen={2}
          shouldAnimateInitialOpen={false}
        >
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
              <div></div>
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
              <div></div>
            </SwapAnimationWrapper>
          </AccordionSection>
        </Accordion>
      </div>
    </Fragment>
  );

  return (
    <ColumnComponent
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
