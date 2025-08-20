"use client";

import { useScaleShow } from "@/animations/ScaleShow";
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
      Content
    </div>
  );
}
