import {RefObject} from "react";

export interface HomeContentProps {
  titleRef: RefObject<HTMLDivElement | null>;
  loginFormRef: RefObject<HTMLDivElement | null>;
  hasMountedRef: RefObject<boolean>;
  backgroundRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
}
