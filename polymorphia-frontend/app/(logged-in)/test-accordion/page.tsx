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
    <div ref={wrapperRef} className="py-6 px-32">
      <div className="w-2xl bg-gray-300">
        <Accordion>
          <AccordionSection id="s1" title="Sekcja 1">
            <div className="h-5 bg-pink-300">Content</div>
          </AccordionSection>
          <AccordionSection id="s2" title="Sekcja 2">
            <div className="h-10 bg-cyan-600">Content</div>
          </AccordionSection>
          <AccordionSection id="s3" title="Sekcja 3">
            <div className="h-7 bg-orange-300">Content</div>
          </AccordionSection>
        </Accordion>
      </div>
    </div>
  );
}
