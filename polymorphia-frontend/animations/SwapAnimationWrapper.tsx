import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SwapAnimationWrapperProps } from "@/animations/types";

export const baseSwapAnimationWrapperProps: Omit<
  SwapAnimationWrapperProps,
  "children" | "keyProp"
> = {
  fromVars: { autoAlpha: 0 },
  toVars: {
    autoAlpha: 1,
    ease: "power1.inOut",
  },
  duration: 0.3,
};

export function SwapAnimationWrapper({
  children,
  fromVars,
  toVars,
  duration,
  keyProp,
}: SwapAnimationWrapperProps) {
  const [displayed, setDisplayed] = useState(children);
  const displayedRef = useRef(children);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const latestChildrenRef = useRef(children);
  const keyPropRef = useRef(keyProp);
  const isAnimatingRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  displayedRef.current = displayed;
  latestChildrenRef.current = children;

  const animateToLatest = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const nextKey = keyProp;
    const nextChildren = latestChildrenRef.current;

    // skip animation if key hasn't changed
    if (keyPropRef.current === nextKey) {
      if (!isAnimatingRef.current && displayedRef.current !== nextChildren) {
        setDisplayed(nextChildren);
      }
      return;
    }

    // update for new animation
    keyPropRef.current = nextKey;
    isAnimatingRef.current = true;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        // If children changed during animation, animate again
        if (latestChildrenRef.current !== displayedRef.current) {
          animateToLatest();
        }
      },
    });

    // fade out current content
    timelineRef.current.to(containerRef.current, { ...fromVars, duration });

    // swap content after fade-out
    timelineRef.current.add(() => {
      setDisplayed(latestChildrenRef.current);
    });

    // fade in new content
    timelineRef.current.to(containerRef.current, { ...toVars, duration });
  }, [duration, fromVars, keyProp, toVars]);

  // trigger animation when children or keyProp changes
  useEffect(() => {
    animateToLatest();
  }, [animateToLatest, children, keyProp]);

  return (
    <div ref={containerRef} className="h-full flex-1">
      {displayed}
    </div>
  );
}
