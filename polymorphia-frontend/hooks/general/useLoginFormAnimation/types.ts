import { RefObject } from "react";

export interface UseLoginFormAnimation {
  loginFormRef: RefObject<HTMLDivElement | null>;
}

export interface UseLoginFormAnimationProps {
  isLoginFormVisible: boolean;
  titleRef: RefObject<HTMLDivElement | null>;
  hasMountedRef: RefObject<boolean>;
}
