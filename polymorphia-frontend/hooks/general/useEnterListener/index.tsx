import { RefObject, useEffect } from "react";

export function useEnterListener(
  onEnter: () => void,
  targetRef?: RefObject<HTMLElement | null>,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;

      if (
        targetRef &&
        (!targetRef.current || !targetRef.current.contains(activeElement))
      ) {
        return;
      }

      if (["TEXTAREA"].includes(activeElement?.nodeName || "")) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        onEnter();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [onEnter, targetRef, enabled]);
}
