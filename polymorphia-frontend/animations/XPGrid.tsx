import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { GradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";

export function useXPGridAnimation(
  currentPage: number,
  sliderRef: React.RefObject<HTMLDivElement | null>,
  setCurrentPage: (n: number) => void,
  gradableEventsData: GradableEventResponseDTO[] | undefined,
  firstRender: boolean,
  setFirstRender: (b: boolean) => void
): {
  handlePageChange: (selected: { selected: number }) => void;
  isAnimating: boolean;
} {
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const previousPageRef = useRef(currentPage);

  const handlePageChange = (selected: { selected: number }) => {
    const newPage = selected.selected;
    if (newPage === currentPage || isAnimating) return;

    const dir = newPage > currentPage ? 1 : -1;
    setDirection(dir);
    setFirstRender(false);
    setIsAnimating(true);
    previousPageRef.current = currentPage;

    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -dir * 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentPage(newPage);
        },
      });
    }
  };

  useEffect(() => {
    if (!gradableEventsData || !sliderRef.current) return;

    if (firstRender) {
      setIsAnimating(false);
      return;
    }

    if (previousPageRef.current === currentPage) {
      setIsAnimating(false);
      return;
    }

    gsap.fromTo(
      sliderRef.current,
      {
        xPercent: direction * 100,
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          setIsAnimating(false);
          previousPageRef.current = currentPage;
        },
      }
    );
  }, [currentPage, gradableEventsData, direction, firstRender]);

  return {
    handlePageChange,
    isAnimating,
  };
}
