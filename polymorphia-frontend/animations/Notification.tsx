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
    .to(element, {
      minHeight: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderWidth: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
};
