import { useContext } from "react";
import { AccordionContext } from "@/components/providers/accordion/AccordionContext";

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error("useAccordion must be used within an Accordion");
  }

  return context;
}
