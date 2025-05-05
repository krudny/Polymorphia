import gsap from 'gsap';

export const animateLoginFormVisibility = (
    loginFormElement: HTMLDivElement,
    titleSectionElement: HTMLDivElement,
    isVisible: boolean
) => {
  gsap.timeline()
      .to(titleSectionElement, { opacity: isVisible ? 0 : 1, scale: isVisible ? 0.8 : 1, duration: 0.5, ease: "power3.inOut" })
      .fromTo(
          loginFormElement,
          isVisible ? { x: "0%", opacity: 0 } : { x: "-100%" },
          isVisible ? { x: "-100%", opacity: 1, duration: 0.4, ease: "power2.inOut" } : { x: "0%", opacity: 0, duration: 0.6, ease: "power2.inOut", yoyo: true },
          "<"
      );
};

export const animateInitialMount = (
    backgroundElement: HTMLDivElement,
    titleSectionElement: HTMLDivElement,
    imageElement: HTMLDivElement,
    onComplete: () => void
) => {
  gsap.timeline()
      .fromTo(backgroundElement, { x: "-100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 0.4, ease: "power2.inOut" }, 0)
      .fromTo(titleSectionElement, { x: "100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 0.6, ease: "power2.inOut" }, 0)
      .fromTo(imageElement, { x: "-100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 0.6, ease: "power2.inOut" }, "<")
      .then(onComplete);
};