import { RefObject } from "react";

export interface HomeContentProps {
  titleRef: RefObject<HTMLDivElement | null>;
  hasMountedRef: RefObject<boolean>;
}
