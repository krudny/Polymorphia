import { createContext, useCallback, useRef, useState } from "react";
import { AccordionContextInterface } from "./types";

export const AccordionContext = createContext<
  AccordionContextInterface | undefined
>(undefined);

export function useAccordionState(maxOpen?: number): AccordionContextInterface {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const registeredIds = useRef<Set<string>>(new Set());

  const register = useCallback((id: string) => {
    registeredIds.current.add(id);
  }, []);

  const unregister = useCallback((id: string) => {
    registeredIds.current.delete(id);
    setOpenSections((prev) => prev.filter((sectionId) => sectionId !== id));
  }, []);

  const open = useCallback(
    (id: string) => {
      if (!registeredIds.current.has(id)) {
        console.warn(`[Accordion] Tried to open invalid id "${id}"`);
        return;
      }
      setOpenSections((prev) => {
        if (prev.includes(id)) {
          return prev;
        }
        if (maxOpen !== undefined && prev.length >= maxOpen) {
          return [...prev.slice(prev.length - maxOpen + 1), id];
        }
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
    setOpenSections((prev) => prev.filter((sectionId) => sectionId !== id));
  }, []);

  const closeAll = useCallback(() => {
    setOpenSections([]);
  }, []);

  const toggle = useCallback(
    (id: string) => {
      if (openSections.includes(id)) {
        close(id);
      } else {
        open(id);
      }
    },
    [openSections, open, close]
  );

  const isOpen = useCallback(
    (id: string) => openSections.includes(id),
    [openSections]
  );

  return { open, close, closeAll, toggle, isOpen, register, unregister };
}
