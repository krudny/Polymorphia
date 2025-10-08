import { gsap } from "gsap";

let previousHeight = 0;

export const openAccordion = (element: HTMLElement, isInstant: boolean) => {
  // Account for some rounding issues that make accordion jump during animation
  let height = element.scrollHeight;
  if (Math.abs(previousHeight - height) <= 1) {
    height = Math.max(height, previousHeight);
  }
  previousHeight = height;

  gsap.fromTo(
    element,
    {
      height: 0,
      opacity: 0,
      marginTop: 0,
    },
    {
      height,
      opacity: 1,
      marginTop: "0.5rem",
      duration: isInstant ? 0 : 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(element, { height: "auto" });
      },
    }
  );
};

export const closeAccordion = (element: HTMLElement, isInstant: boolean) => {
  // Account for some rounding issues that make accordion jump during animation
  let height = element.clientHeight;
  const marginTop = element.style.marginTop;
  if (Math.abs(previousHeight - height) <= 1) {
    height = Math.max(height, previousHeight);
  }
  previousHeight = height;

  gsap.fromTo(
    element,
    {
      height,
      opacity: 1,
      marginTop: marginTop,
    },
    {
      height: 0,
      opacity: 0,
      marginTop: 0,
      duration: isInstant ? 0 : 0.4,
      ease: "power2.inOut",
    }
  );
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
