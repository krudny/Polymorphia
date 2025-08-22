import { gsap } from "gsap";

export const openAccordion = (element: HTMLElement) => {
  gsap.to(element, {
    height: "auto",
    opacity: 1,
    marginTop: "0.5rem",
    duration: 0.4,
    ease: "power2.inOut",
  });
};

export const closeAccordion = (element: HTMLElement) => {
  gsap.to(element, {
    height: 0,
    opacity: 0,
    marginTop: 0,
    duration: 0.4,
    ease: "power2.inOut",
  });
};

export const animateAccordion = (element: HTMLElement, open: boolean) => {
  if (open) {
    openAccordion(element);
  } else {
    closeAccordion(element);
  }
};
