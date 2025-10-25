import { forwardRef, useImperativeHandle } from "react";
import {
  AccordionContext,
  useAccordionState,
} from "@/providers/accordion/AccordionContext";
import { AccordionRef } from "@/providers/accordion/types";
import "./index.css";
import { AccordionProps } from "@/components/accordion/types";
import clsx from "clsx";

export const AccordionComponent = forwardRef<AccordionRef, AccordionProps>(
  ({ children, className, ...rest }, ref) => {
    const accordionContext = useAccordionState(rest);

    useImperativeHandle(ref, () => ({
      open: accordionContext.open,
      close: accordionContext.close,
      closeAll: accordionContext.closeAll,
      resetToInitial: accordionContext.resetToInitial,
      toggle: accordionContext.toggle,
    }));

    return (
      <AccordionContext.Provider value={accordionContext}>
        <div className={clsx("accordion-flex-col", className)}>{children}</div>
      </AccordionContext.Provider>
    );
  }
);

AccordionComponent.displayName = "Accordion";

export const Accordion = AccordionComponent;
