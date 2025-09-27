import gsap from "gsap";

export function animateWelcome(
  wrapper: HTMLDivElement,
  onComplete: () => void
): void {
  gsap.fromTo(
    wrapper,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => onComplete(),
    }
  );
}
