import { ReactNode } from "react";

export interface SwapAnimationWrapperProps {
  children: ReactNode;
  fromVars: Omit<gsap.TweenVars, "duration" | "onComplete">;
  toVars: Omit<gsap.TweenVars, "duration" | "onComplete">;
  duration: gsap.TweenValue;
  keyProp: string | number | undefined;
}
