import { useEffect, useState, RefObject } from "react";

interface Position {
  left: number;
  top: number;
}

//TODO: types

function usePosition(
  ref: RefObject<HTMLElement | null>,
  trigger?: boolean
): Position {
  const [position, setPosition] = useState<Position>({ left: 0, top: 0 });

  useEffect(() => {
    if (!ref.current) return;

    let animationFrameId: number;

    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const styles = window.getComputedStyle(ref.current);

        const marginLeft = parseFloat(styles.marginLeft) / 2 || 0;
        const marginTop = parseFloat(styles.marginTop) / 2 || 0;

        setPosition({
          left: rect.left - marginLeft,
          top: rect.top - marginTop,
        });
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [ref, trigger]);

  return position;
}

export default usePosition;
