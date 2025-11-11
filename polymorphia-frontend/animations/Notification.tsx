import gsap from "gsap";

export const animateNotificationEntry = (element: HTMLElement): void => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.85,
      height: 0,
      marginBottom: 0,
    },
    {
      opacity: 1,
      scale: 1,
      height: "auto",
      marginBottom: 16,
      duration: 0.4,
      ease: "sine.out",
    }
  );
};

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
        duration: 0.2,
        ease: "power1.inOut",
      },
      "+=0.1"
    );
};
