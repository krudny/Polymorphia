"use client"
import gsap from "gsap";
import {RefObject, useEffect, useRef} from "react";

export const animateScaleShow = (ref: HTMLDivElement) => {
  gsap.fromTo(ref, {
    scale: 0.9,
    autoAlpha: 0
  }, {
    scale: 1,
    autoAlpha: 1,
    duration: 0.3,
    ease: "power1.in"
  });
}


export function useScaleShow() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      animateScaleShow(ref.current)
    }
  }, [])

  return ref
}