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

export const animateSlider = (sliderRef: HTMLDivElement) => {
  gsap.fromTo(sliderRef, {
      scale: 0.8,
      autoAlpha: 0
    }, {
      scale: 1,
      autoAlpha: 1,
      delay: 0.1,
      duration: 0.4,
      ease: "power2.out"
    });
}