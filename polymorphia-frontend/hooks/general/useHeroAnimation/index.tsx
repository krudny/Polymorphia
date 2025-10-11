import { useLayoutEffect, useRef } from "react";
import { animateInitialMount } from "@/animations/Home";
import { UseHeroAnimation } from "./types";

export function useHeroAnimation(): UseHeroAnimation {
  const owlBackgroundRef = useRef<HTMLDivElement>(null);
  const owlRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!owlBackgroundRef.current || !titleRef.current || !owlRef.current) {
      return;
    }

    const startAnimation = () => {
      animateInitialMount(
        owlBackgroundRef.current!,
        titleRef.current!,
        owlRef.current!,
        () => {
          hasMountedRef.current = true;
        }
      );
    };

    if (document.readyState === "complete") {
      startAnimation();
    } else {
      window.addEventListener("load", startAnimation);
      return () => window.removeEventListener("load", startAnimation);
    }
  }, []);

  return { owlBackgroundRef, owlRef, titleRef, hasMountedRef };
}
