import gsap from "gsap";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function animateWelcome(
  wrapper: HTMLDivElement,
  isCourseIdSet: boolean | undefined,
  router: AppRouterInstance
): void {
  gsap.fromTo(
    wrapper,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        if (isCourseIdSet) {
          router.push("/profile");
        } else {
          router.push("/course-choice");
        }
      },
    }
  );
}
