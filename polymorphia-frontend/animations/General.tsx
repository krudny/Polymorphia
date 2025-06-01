'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export const animateScaleShow = (ref: HTMLDivElement) => {
  gsap.fromTo(
    ref,
    {
      scale: 0.9,
      autoAlpha: 0,
    },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power1.in',
    }
  );
};

export function useScaleShow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (ref.current) {
        animateScaleShow(ref.current);
      }
    }, 10);

    return () => clearTimeout(handle);
  }, []);

  return ref;
}
