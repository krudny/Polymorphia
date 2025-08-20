import { useEffect, useRef } from "react";
import { useAccordion } from "../providers/accordion/AccordionContext";
import { AccordionSectionProps } from "./types";
import { gsap } from "gsap";

export default function AccordionSection({
  id,
  title,
  children,
}: AccordionSectionProps) {
  const { register, unregister, isOpen, toggle } = useAccordion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(id);
    return () => unregister(id);
  }, [id, register, unregister]);

  const open = isOpen(id);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        gsap.to(contentRef.current, {
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [open]);

  return (
    <div>
      <button onClick={() => toggle(id)}>Toggle {title}</button>
      <div ref={contentRef} className="overflow-hidden h-0">
        {children}
      </div>
    </div>
  );
}
