import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AccordionContextInterface } from "./types";
import { AccordionMaxOpen } from "@/components/accordion/types";

export const AccordionContext = createContext<
  AccordionContextInterface | undefined
>(undefined);

export function useAccordion() {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error("useAccordion must be used within an Accordion");
  }

  return context;
}

export function useAccordionState(
  maxOpen: AccordionMaxOpen
): AccordionContextInterface {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const registeredIds = useRef<Set<string>>(new Set());

  const register = useCallback((id: string) => {
    registeredIds.current.add(id);
  }, []);

  const unregister = useCallback((id: string) => {
    registeredIds.current.delete(id);
    setOpenSections((prev) => prev.filter((s) => s !== id));
  }, []);

  const open = useCallback(
    (id: string) => {
      if (!registeredIds.current.has(id)) {
        console.warn(`[Accordion] Tried to open invalid id "${id}"`);
        return;
      }
      // console.log("open", id);
      setOpenSections((prev) => {
        // console.log("open", id, prev, maxOpen);
        if (prev.includes(id)) return prev;
        if (maxOpen !== "unlimited" && prev.length >= maxOpen)
          return [...prev.slice(prev.length - maxOpen + 1), id];
        return [...prev, id];
      });
    },
    [maxOpen]
  );

  const close = useCallback((id: string) => {
    if (!registeredIds.current.has(id)) {
      console.warn(`[Accordion] Tried to close invalid id "${id}"`);
      return;
    }
    // console.log("close", id);
    setOpenSections((prev) => prev.filter((s) => s !== id));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      // console.log("toggle", id);
      if (openSections.includes(id)) close(id);
      else open(id);
    },
    [openSections, open, close]
  );

  const isOpen = useCallback(
    (id: string) => openSections.includes(id),
    [openSections]
  );

  return { open, close, toggle, isOpen, register, unregister };
}
