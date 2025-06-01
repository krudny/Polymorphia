import { GradableEventCoreResponse } from '@/interfaces/course/event-section/EventSectionInterfaces';
import React, { useEffect } from 'react';
import gsap from 'gsap';

export function useEventSectionAnimation(
  pageToShow: number,
  setDirection: (n: 1 | -1) => void,
  sliderRef: React.RefObject<HTMLDivElement | null>,
  setPageToShow: (n: number) => void,
  setCurrentPage: (n: number) => void,
  gradableEventsData: GradableEventCoreResponse | undefined,
  direction: 1 | -1
): { handlePageChange: (selected: { selected: number }) => void } {
  const handlePageChange = (selected: { selected: number }) => {
    const newPage = selected.selected;
    if (newPage === pageToShow) return;

    const dir = newPage > pageToShow ? 1 : -1;
    setDirection(dir);

    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -dir * 20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setPageToShow(newPage);
          setCurrentPage(newPage);
        },
      });
    }
  };

  useEffect(() => {
    if (!gradableEventsData || !sliderRef.current) return;

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { xPercent: direction * 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
    }
  }, [pageToShow, gradableEventsData]); // eslint-disable-line -- adding 'direction' to dependency list breaks the animation

  return {
    handlePageChange: handlePageChange,
  };
}
