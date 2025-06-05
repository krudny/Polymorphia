'use client';
import gsap from 'gsap';
import { useRef, useEffect, useState, useCallback } from 'react';

export function useModalAnimation(onClose: () => void, isOpen: boolean) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return;

    if (!timelineRef.current) {
      timelineRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          [backdropRef.current, modalRef.current],
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power1.in' }
        );
    }

    if (isOpen && !isClosing) {
      timelineRef.current.play();
    }
    if (!isOpen && isClosing) {
      setIsClosing(false);
    }
  }, [isOpen, isClosing]);

  const handleCloseClick = useCallback(() => {
    if (isClosing || !timelineRef.current) return;

    setIsClosing(true);

    timelineRef.current.reverse().eventCallback('onReverseComplete', () => {
      onClose();
      if (!isClosing && timelineRef.current) return;
      timelineRef.current?.eventCallback('onReverseComplete', null);
    });
  }, [isClosing, onClose]);

  return { modalRef, backdropRef, handleCloseClick };
}
