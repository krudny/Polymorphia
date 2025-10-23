import { useLayoutEffect, useRef } from "react";
import { animateLoginFormVisibility } from "@/animations/Home";
import {
  UseLoginFormAnimation,
  UseLoginFormAnimationProps,
} from "@/hooks/general/useLoginFormAnimation/types";

export function useLoginFormAnimation({
  isLoginFormVisible,
  titleRef,
  hasMountedRef,
}: UseLoginFormAnimationProps): UseLoginFormAnimation {
  const loginFormRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!hasMountedRef.current || !loginFormRef.current || !titleRef.current) {
      return;
    }

    animateLoginFormVisibility(
      loginFormRef.current,
      titleRef.current,
      isLoginFormVisible
    );
  }, [isLoginFormVisible]);

  return { loginFormRef };
}
