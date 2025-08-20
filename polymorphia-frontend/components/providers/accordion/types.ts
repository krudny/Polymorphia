type AccordionAction<T> = (id: string) => T;

export interface AccordionRef {
  open: AccordionAction<void>;
  close: AccordionAction<void>;
  toggle: AccordionAction<void>;
}

export interface AccordionContextInterface extends AccordionRef {
  register: AccordionAction<void>;
  unregister: AccordionAction<void>;
  isOpen: AccordionAction<boolean>;
}
