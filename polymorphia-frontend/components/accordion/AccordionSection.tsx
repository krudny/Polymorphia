import { animateAccordion } from "@/animations/Accordion";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import "./index.css";
import { AccordionSectionProps } from "./types";
import { useAccordionContext } from "@/hooks/contexts/useAccordionContext";

export default function AccordionSection({
  id,
  title,
  children,
  headerClassName,
}: AccordionSectionProps) {
  const { isOpen, toggle, shouldAnimateInitialOpen } = useAccordionContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isOpened = isOpen(id);
  useEffect(() => {
    if (contentRef.current) {
      animateAccordion(
        contentRef.current,
        isOpened,
        isFirstRender.current && !shouldAnimateInitialOpen
      );
      isFirstRender.current = false;
    }
  }, [isOpened, shouldAnimateInitialOpen]);

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
