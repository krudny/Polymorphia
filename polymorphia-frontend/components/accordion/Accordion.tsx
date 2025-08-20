import { forwardRef, useImperativeHandle } from "react";
import { AccordionRef } from "../providers/accordion/types";
import { AccordionProps } from "./types";
import {
  AccordionContext,
  useAccordionState,
} from "../providers/accordion/AccordionContext";

export const AccordionComponent = forwardRef<AccordionRef, AccordionProps>(
  ({ children, maxOpen = "unlimited" }, ref) => {
    const accordionContext = useAccordionState(maxOpen);

    useImperativeHandle(ref, () => ({
      open: accordionContext.open,
      close: accordionContext.close,
      toggle: accordionContext.toggle,
    }));

    return (
      <AccordionContext.Provider value={accordionContext}>
        <div className="flex flex-col gap-2">{children}</div>
      </AccordionContext.Provider>
    );
  }
);

AccordionComponent.displayName = "Accordion";

export const Accordion = AccordionComponent;
