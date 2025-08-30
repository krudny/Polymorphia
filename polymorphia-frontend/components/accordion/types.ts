import { ReactNode } from "react";

export interface AccordionProps {
  children: ReactNode;
  maxOpen?: number;
  className?: string;
}

export interface AccordionSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  isInitiallyOpened?: boolean;
  headerClassName?: string;
}
