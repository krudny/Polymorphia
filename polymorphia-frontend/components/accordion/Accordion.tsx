import { forwardRef, useImperativeHandle } from "react";
import {
  AccordionContext,
  useAccordionState,
} from "../providers/accordion/AccordionContext";
import { AccordionRef } from "../providers/accordion/types";
import "./index.css";
import { AccordionProps } from "./types";
import clsx from "clsx";

export const AccordionComponent = forwardRef<AccordionRef, AccordionProps>(
  ({ children, className, maxOpen }, ref) => {
    const accordionContext = useAccordionState(maxOpen);

    useImperativeHandle(ref, () => ({
      open: accordionContext.open,
      close: accordionContext.close,
      closeAll: accordionContext.closeAll,
      toggle: accordionContext.toggle,
    }));

    return (
      <AccordionContext.Provider value={accordionContext}>
        <div className={clsx("accordion", className)}>{children}</div>
      </AccordionContext.Provider>
    );
  }
);

AccordionComponent.displayName = "Accordion";

export const Accordion = AccordionComponent;
