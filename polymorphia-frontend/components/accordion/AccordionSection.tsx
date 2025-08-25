import { animateAccordion } from "@/animations/Accordion";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAccordion } from "../providers/accordion/AccordionContext";
import "./index.css";
import { AccordionSectionProps } from "./types";

export default function AccordionSection({
                                           id,
                                           title,
                                           children,
                                           isInitiallyOpened,
                                           headerClassName,
                                         }: AccordionSectionProps) {
  const { register, unregister, isOpen, toggle, open } = useAccordion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(id);
    if (isInitiallyOpened) {
      open(id);
    }
    return () => unregister(id);
  }, [id, isInitiallyOpened, open, register, unregister]);

  const isOpened = isOpen(id);
  useEffect(() => {
    if (contentRef.current) {
      animateAccordion(contentRef.current, isOpened);
    }
  }, [isOpened]);

  return (
    <div className="accordion-section">
      <div className={clsx(headerClassName, "accordion-section-header")}>
        <h1>{title}</h1>
        <div className="accordion-toggle-button" onClick={() => toggle(id)}>
          {isOpened ? (
            <div className="accordion-toggle">
              <ArrowUp className="accordion-toggle-arrow" />
              <h2>Zamknij</h2>
            </div>
          ) : (
            <div className="accordion-toggle">
              <ArrowDown className="accordion-toggle-arrow" />
              <h2>Otwórz</h2>
            </div>
          )}
        </div>
      </div>
      <div ref={contentRef} className="accordion-section-content">
        {children}
      </div>
    </div>
  );
}
