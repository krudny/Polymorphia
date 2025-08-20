"use client";

import { useScaleShow } from "@/animations/ScaleShow";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useTitle } from "@/components/navigation/TitleContext";
import { AccordionRef } from "@/components/providers/accordion/types";
import { useEffect, useRef } from "react";

export default function TestAccordion() {
  const { setTitle } = useTitle();
  const wrapperRef = useScaleShow();
  const accordionRef = useRef<AccordionRef>(null);

  useEffect(() => {
    setTitle("Accordion Test");
  }, [setTitle]);

  return (
    <div
      ref={wrapperRef}
      className="py-6 px-32 flex flex-col items-center gap-3"
    >
      <div className="w-xl">
        {/*<Accordion ref={accordionRef} maxOpen={1}>*/}
        <Accordion ref={accordionRef}>
          <AccordionSection id="s1" title="Sekcja 1">
            <div className="h-[300px] bg-pink-300">Content</div>
          </AccordionSection>
          <AccordionSection id="s2" title="Sekcja 2" isInitiallyOpened={true}>
            <div className="h-[150px] bg-cyan-600">Content</div>
          </AccordionSection>
          <AccordionSection id="s3" title="Sekcja 3">
            <div className="h-[400px] bg-orange-300">Content</div>
          </AccordionSection>
        </Accordion>
      </div>
      <ButtonWithBorder
        text="Toggle S1 programmatically"
        onClick={() => {
          accordionRef.current?.toggle("s1");
        }}
      />
      <ButtonWithBorder
        text="Close all"
        onClick={() => {
          accordionRef.current?.closeAll();
        }}
      />
    </div>
  );
}
