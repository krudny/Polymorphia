type AccordionAction<T> = (id: string) => T;

export interface AccordionRef {
  open: AccordionAction<void>;
  close: AccordionAction<void>;
  closeAll: () => void;
  resetToInitial: () => void;
  toggle: AccordionAction<void>;
}

export interface AccordionContextInterface extends AccordionRef {
  isOpen: AccordionAction<boolean>;
}

export interface useAccordionStateProps {
  sectionIds: Set<string>;
  initiallyOpenedSectionIds?: Set<string>;
  maxOpen?: number;
}
