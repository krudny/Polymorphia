"use client";
import { ModalState } from "@/interfaces/modal/ModalInterfaces";
import gsap from "gsap";
import { useRef, useEffect, useState, useLayoutEffect, RefObject } from "react";

export function useAnimatedModalState(
  isOpen: boolean,
  modalRef: RefObject<HTMLDivElement | null>,
  backdropRef: RefObject<HTMLDivElement | null>,
  onClosed: () => void
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [modalState, setModalState] = useState<ModalState>("closed");

  // Set timeline only once
  useLayoutEffect(() => {
    if (!modalRef.current || !backdropRef.current || !!timelineRef.current)
      return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setModalState("opened");
      },
    });

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: "power1.inOut" }
    ).fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.2, ease: "power1.inOut" },
      "<"
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [backdropRef, modalRef]);

  // Handle changes to onClosed callback separately to setting timeline
  // to avoid resetting the timeline on re-renders
  useLayoutEffect(() => {
    if (!timelineRef.current) return;
    timelineRef.current.eventCallback("onReverseComplete", () => {
      onClosed();
      setModalState("closed");
    });
  }, [onClosed]);

  // Handle modal state
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isOpen && modalState === "closed") {
      setModalState("opening");
      tl.play();
    }

    if (!isOpen && modalState === "opened") {
      setModalState("closing");
      tl.reverse();
    }
  }, [isOpen, modalState]);

  return modalState;
}
