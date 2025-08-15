import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { StudentGradableEventResponseDTO } from "@/interfaces/api/DTO";

export function useXPGridAnimation(
  pageToShow: number,
  setDirection: (n: 1 | -1) => void,
  sliderRef: React.RefObject<HTMLDivElement | null>,
  setPageToShow: (n: number) => void,
  setCurrentPage: (n: number) => void,
  gradableEventsData: StudentGradableEventResponseDTO[] | undefined,
  direction: 1 | -1,
  firstRender: boolean,
  setFirstRender: (b: boolean) => void
): { handlePageChange: (selected: { selected: number }) => void } {
  const handlePageChange = (selected: { selected: number }) => {
    const newPage = selected.selected;
    if (newPage === pageToShow) return;

    const dir = newPage > pageToShow ? 1 : -1;
    setDirection(dir);
    setFirstRender(false);

    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -dir * 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setPageToShow(newPage);
          setCurrentPage(newPage);
        },
      });
    }
  };

  const firstRenderRef = useRef(firstRender);
  firstRenderRef.current = firstRender;

  const directionRef = useRef(direction);
  directionRef.current = direction;

  useEffect(() => {
    if (!gradableEventsData || !sliderRef.current) return;
    if (firstRenderRef.current) {
      return;
    }

    const dir = directionRef.current;

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { xPercent: dir * 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [pageToShow, gradableEventsData, sliderRef]);

  return {
    handlePageChange: handlePageChange,
  };
}
