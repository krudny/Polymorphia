import gsap from "gsap";

export default function shakeInOut(element: HTMLElement) {
  gsap.to(element, {
    keyframes: {
      y: [0, -5, 5, -5, 5, 0],
      easeEach: "sine.inOut",
    },
    duration: 0.6,
    ease: "none",
  });
}
