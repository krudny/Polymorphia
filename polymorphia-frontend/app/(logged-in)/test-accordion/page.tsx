"use client";

import { useScaleShow } from "@/animations/ScaleShow";
import { Accordion } from "@/components/accordion/Accordion";
import AccordionSection from "@/components/accordion/AccordionSection";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";

export default function TestAccordion() {
  const { setTitle } = useTitle();
  const wrapperRef = useScaleShow();

  useEffect(() => {
    setTitle("Accordion Test");
  }, [setTitle]);

  return (
    <div ref={wrapperRef} className="py-6 px-32 flex justify-center">
      <div className="w-xl bg-gray-300">
        <Accordion maxOpen={1}>
          <AccordionSection id="s1" title="Sekcja 1">
            <div className="h-[300px] bg-pink-300">Content</div>
          </AccordionSection>
          <AccordionSection id="s2" title="Sekcja 2" initiallyOpened={true}>
            <div className="h-[150px] bg-cyan-600">Content</div>
          </AccordionSection>
          <AccordionSection id="s3" title="Sekcja 3">
            <div className="h-[400px] bg-orange-300">Content</div>
          </AccordionSection>
        </Accordion>
      </div>
    </div>
  );
}
