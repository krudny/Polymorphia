import { gsap } from "gsap";

let previousHeight = 0;

const getHeight = (
  element: HTMLElement,
  shouldUseScrollHeight: boolean
): number => {
  // Account for some rounding issues that make accordion jump during animation
  let height;
  if (shouldUseScrollHeight) {
    height = element.scrollHeight;
  } else {
    height = element.clientHeight;
  }

  if (Math.abs(previousHeight - height) <= 1) {
    height = Math.max(height, previousHeight);
  }

  previousHeight = height;

  return height;
};

export const openAccordion = (element: HTMLElement, isInstant: boolean) => {
  const height = getHeight(element, true);

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
  const height = getHeight(element, false);
  const marginTop = element.style.marginTop;

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
