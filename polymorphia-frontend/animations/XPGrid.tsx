import { useEffect, useRef, RefObject, ReactNode } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function useXPGridAnimation(
  pageToShow: number,
  setDirection: (n: 1 | -1) => void,
  sliderRef: RefObject<HTMLDivElement | null>,
  setPageToShow: (n: number) => void,
  setCurrentPage: (n: number) => void,
  cards: ReactNode[] | undefined,
  direction: 1 | -1,
  firstRender: boolean,
  setFirstRender: (b: boolean) => void
): { handlePageChange: (selected: { selected: number }) => void } {
  const firstRenderRef = useRef(firstRender);
  firstRenderRef.current = firstRender;

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const handlePageChange = (selected: { selected: number }) => {
    const newPage = selected.selected;
    if (newPage === pageToShow) return;

    const dir = newPage > pageToShow ? 1 : -1;
    setDirection(dir);
    setFirstRender(false);

    if (sliderRef.current) {
      const hasWindowScroll = window.scrollY > 0;

      const tl = gsap.timeline();

      tl.to(sliderRef.current, {
        xPercent: -dir * 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setPageToShow(newPage);
          setCurrentPage(newPage);
        },
      });

      if (hasWindowScroll) {
        tl.to(window, {
          scrollTo: { y: 0 },
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  useEffect(() => {
    if (!cards || !sliderRef.current) return;
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
  }, [pageToShow, cards, sliderRef]);

  return {
    handlePageChange: handlePageChange,
  };
}
