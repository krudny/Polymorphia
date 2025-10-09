import { RefObject } from "react";

export interface OwlImageProps {
  owlBackgroundRef: RefObject<HTMLDivElement | null>;
  owlRef: RefObject<HTMLDivElement | null>;
}
