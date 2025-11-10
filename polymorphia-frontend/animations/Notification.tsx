import gsap from "gsap";

export const animateNotificationRemoval = (
  element: HTMLElement,
  onComplete?: () => void
): void => {
  gsap
    .timeline({
      onComplete: () => {
        onComplete?.();
      },
    })
    .to(element, {
      x: -100,
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    })
    .to(
      element,
      {
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.1,
        ease: "power2.inOut",
      },
      "+=0.1"
    );
};
