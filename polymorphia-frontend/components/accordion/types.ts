import { ReactNode } from "react";

export type AccordionMaxOpen = number | "unlimited";

export interface AccordionProps {
  children: ReactNode;
  maxOpen?: AccordionMaxOpen;
  className?: string;
}

export interface AccordionSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  initiallyOpened?: boolean;
  headerClassName?: string;
}
