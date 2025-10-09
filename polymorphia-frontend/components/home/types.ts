import { RefObject } from "react";

export interface HomeContentProps {
  backgroundRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
}
