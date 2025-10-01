import { useLayoutEffect, useRef } from "react";
import { animateInitialMount } from "@/animations/Home";

export function useHeroAnimation() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!backgroundRef.current || !titleRef.current || !imageRef.current) {
      return;
    }

    animateInitialMount(
      backgroundRef.current,
      titleRef.current,
      imageRef.current,
      () => {
        hasMountedRef.current = true;
      }
    );
  }, []);

  return { backgroundRef, imageRef, titleRef, hasMountedRef };
}
