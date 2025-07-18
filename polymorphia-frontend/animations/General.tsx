"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function useScaleShow(shouldAnimate: boolean = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { scale: 0.9, autoAlpha: 0 });

    if (!shouldAnimate) return;

    gsap.fromTo(
      ref.current,
      { scale: 0.9, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power1.inOut" }
    );
  }, [shouldAnimate]);

  return ref;
}
