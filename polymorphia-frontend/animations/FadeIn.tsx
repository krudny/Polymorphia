import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useFadeInAnimate(shouldAnimate: boolean = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.set(ref.current, { autoAlpha: 0 });

    if (!shouldAnimate) {
      return;
    }

    gsap.fromTo(
      ref.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, ease: "power1.out" }
    );
  }, [shouldAnimate]);

  return ref;
}
