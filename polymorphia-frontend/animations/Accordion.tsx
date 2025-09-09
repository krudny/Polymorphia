import { gsap } from "gsap";

export const openAccordion = (element: HTMLElement, isInstant: boolean) => {
  gsap.to(element, {
    height: "auto",
    opacity: 1,
    marginTop: "0.5rem",
    duration: isInstant ? 0.0 : 0.4,
    ease: "power2.inOut",
  });
};

export const closeAccordion = (element: HTMLElement, isInstant: boolean) => {
  gsap.to(element, {
    height: 0,
    opacity: 0,
    marginTop: 0,
    duration: isInstant ? 0.0 : 0.4,
    ease: "power2.inOut",
  });
};

export const animateAccordion = (
  element: HTMLElement,
  open: boolean,
  isInstant: boolean = false
) => {
  if (open) {
    openAccordion(element, isInstant);
  } else {
    closeAccordion(element, isInstant);
  }
};
