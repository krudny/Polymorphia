import { RefObject } from "react";

export interface UseHeroAnimation {
  owlBackgroundRef: RefObject<HTMLDivElement | null>;
  owlRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  hasMountedRef: RefObject<boolean>;
}
