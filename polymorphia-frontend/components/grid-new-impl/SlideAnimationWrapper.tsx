import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

interface SlideAnimationWrapperProps {
  children: ReactNode;
  triggerKey: string | number;
  direction: "left" | "right";
  className?: string;
}

export default function SlideAnimationWrapper({
  children,
  triggerKey,
  direction,
  className = "",
}: SlideAnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeContent, setActiveContent] = useState(children);
  const [leavingContent, setLeavingContent] = useState<ReactNode | null>(null);

  const prevKeyRef = useRef(triggerKey);

  if (triggerKey !== prevKeyRef.current) {
    prevKeyRef.current = triggerKey;
    setLeavingContent(activeContent);
    setActiveContent(children);
  } else {
    if (activeContent !== children && leavingContent === null) {
      setActiveContent(children);
    }
  }

  useLayoutEffect(() => {
    if (!leavingContent) {
      return;
    }

    const ctx = gsap.context(() => {
      const enterFrom = direction === "right" ? 105 : -105;
      const exitTo = direction === "right" ? -105 : 105;

      gsap.set(".slide-enter", { xPercent: enterFrom, autoAlpha: 1 });
      gsap.set(".slide-exit", { xPercent: 0, autoAlpha: 1 });

      gsap.to(".slide-enter", {
        xPercent: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".slide-exit", {
        xPercent: exitTo,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setLeavingContent(null);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [leavingContent, direction]);

  return (
    <div
      ref={containerRef}
      className={`relative grid grid-cols-1 grid-rows-1 overflow-hidden ${className}`}
    >
      <div className="slide-enter col-start-1 row-start-1 w-full h-full">
        {activeContent}
      </div>

      {leavingContent && (
        <div className="slide-exit col-start-1 row-start-1 w-full h-full pointer-events-none">
          {leavingContent}
        </div>
      )}
    </div>
  );
}
