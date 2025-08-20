import { ReactNode } from "react";

export type AccordionMaxOpen = number | "unlimited";

export interface AccordionProps {
  children: ReactNode;
  maxOpen?: AccordionMaxOpen;
}

export interface AccordionSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}
