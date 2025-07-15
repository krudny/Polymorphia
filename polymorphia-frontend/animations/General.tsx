"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const animateScaleShow = (ref: HTMLDivElement) => {
  gsap.fromTo(
    ref,
    { y: 50, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.25, ease: "power1.in" }
  );
};

export function useScaleShow(animate: boolean = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!animate) {
      gsap.set(ref.current, { y: 0, autoAlpha: 1 });
      return;
    }

    // Run entry animation
    animateScaleShow(ref.current);
  }, [animate]);

  return ref;
}
