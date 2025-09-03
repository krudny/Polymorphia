import { gsap } from "gsap";

export const openAccordion = (element: HTMLElement, instant: boolean) => {
  gsap.to(element, {
    height: "auto",
    opacity: 1,
    marginTop: "0.5rem",
    duration: instant ? 0.0 : 0.4,
    ease: "power2.inOut",
  });
};

export const closeAccordion = (element: HTMLElement, instant: boolean) => {
  gsap.to(element, {
    height: 0,
    opacity: 0,
    marginTop: 0,
    duration: instant ? 0.0 : 0.4,
    ease: "power2.inOut",
  });
};

export const animateAccordion = (
  element: HTMLElement,
  open: boolean,
  instant: boolean = false
) => {
  if (open) {
    openAccordion(element, instant);
  } else {
    closeAccordion(element, instant);
  }
};
