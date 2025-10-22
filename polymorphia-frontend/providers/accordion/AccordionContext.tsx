import { createContext, useCallback, useEffect, useState } from "react";
import {
  AccordionContextInterface,
  useAccordionStateProps,
} from "@/providers/accordion/types";
import { getInitialOpenSections } from "@/providers/accordion/utils/getInitialOpenSections";

export const AccordionContext = createContext<
  AccordionContextInterface | undefined
>(undefined);

export function useAccordionState({
  sectionIds,
  initiallyOpenedSectionIds = new Set(),
  maxOpen,
  shouldAnimateInitialOpen = true,
}: useAccordionStateProps): AccordionContextInterface {
  const [openSections, setOpenSections] = useState<string[]>(() =>
    getInitialOpenSections(sectionIds, initiallyOpenedSectionIds, maxOpen)
  );

  useEffect(() => {
    setOpenSections((prev) =>
      prev.filter((sectionId) => sectionIds.has(sectionId))
    );
  }, [sectionIds]);

  const open = useCallback(
    (id: string) => {
      if (!sectionIds.has(id)) {
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
    [maxOpen, sectionIds]
  );

  const close = useCallback(
    (id: string) => {
      if (!sectionIds.has(id)) {
        console.warn(`[Accordion] Tried to close invalid id "${id}"`);
        return;
      }
      setOpenSections((prev) => prev.filter((sectionId) => sectionId !== id));
    },
    [sectionIds]
  );

  const closeAll = useCallback(() => {
    setOpenSections([]);
  }, []);

  const resetToInitial = useCallback(() => {
    setOpenSections(
      getInitialOpenSections(sectionIds, initiallyOpenedSectionIds, maxOpen)
    );
  }, [initiallyOpenedSectionIds, maxOpen, sectionIds]);

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

  return {
    open,
    close,
    closeAll,
    resetToInitial,
    toggle,
    isOpen,
    shouldAnimateInitialOpen,
  };
}
