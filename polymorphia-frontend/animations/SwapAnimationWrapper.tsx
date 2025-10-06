import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SwapAnimationWrapperProps {
  children: ReactNode;
  fromVars: Omit<gsap.TweenVars, "duration" | "onComplete">;
  toVars: Omit<gsap.TweenVars, "duration" | "onComplete">;
  duration: gsap.TweenValue;
  keyProp: string | number | undefined;
}

export function SwapAnimationWrapper({
  children,
  fromVars,
  toVars,
  duration,
  keyProp,
}: SwapAnimationWrapperProps) {
  const [displayed, setDisplayed] = useState(children);
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.to(ref.current, {
      ...fromVars,
      duration,
      onComplete: () => {
        setDisplayed(children);

        gsap.fromTo(ref.current, fromVars, {
          ...toVars,
          duration,
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We want this effect to run ONLY when key changes.
  }, [keyProp]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    gsap.fromTo(ref.current, fromVars, toVars);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We want this effect to run ONLY on first mount.
  }, []);

  return <div ref={ref}>{displayed}</div>;
}
