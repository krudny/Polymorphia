import { ReactNode, RefObject } from "react";

export interface SectionViewProps {
  children?: ReactNode;
  ref: RefObject<HTMLDivElement | null>;
}
