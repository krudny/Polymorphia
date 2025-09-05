import { useAccordionStateProps } from "@/providers/accordion/types";
import { ReactNode } from "react";

export interface AccordionProps extends useAccordionStateProps {
  children: ReactNode;
  className?: string;
}

export interface AccordionSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  headerClassName?: string;
}
