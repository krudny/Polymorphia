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
  initiallyOpened,
  headerClassName,
}: AccordionSectionProps) {
  const { register, unregister, isOpen, toggle, open } = useAccordion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(id);
    if (initiallyOpened) {
      open(id);
    }
    return () => unregister(id);
  }, [id, initiallyOpened, open, register, unregister]);

  const opened = isOpen(id);
  useEffect(() => {
    if (contentRef.current) {
      animateAccordion(contentRef.current, opened);
    }
  }, [opened]);

  return (
    <div className="accordion-section">
      <div className={clsx("accordion-section-header", headerClassName)}>
        <h1>{title}</h1>
        <div className="accordion-toggle-button" onClick={() => toggle(id)}>
          {opened ? (
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
