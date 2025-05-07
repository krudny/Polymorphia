import gsap from 'gsap';

export const animateSingleSlide = (
    slideRef: HTMLDivElement,
    position: number,
) => {
  gsap.to(slideRef, {
    xPercent: position * 100,
    opacity: position === 0 ? 1 : 0,
    scale: position === 0 ? 1 : 0.9,
    zIndex: position === 0 ? 1 : 0,
    duration: 0.5,
    ease: "power2.out",
  });
};
