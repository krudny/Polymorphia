import { useEffect } from "react";

export function useEnterListener(onEnter: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = event.target as HTMLElement;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement?.nodeName || "")
      ) {
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
  }, [onEnter, enabled]);
}
