import { SpeedDialItem, SpeedDialProps } from "@/components/speed-dial/types";
import { useMemo } from "react";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategy/Registry";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export function useSpeedDialFactory({ type }: SpeedDialProps): SpeedDialItem[] {
  const markdownContext = useMarkdownContext();

  return useMemo(() => {
    const selectedType = speedDialStrategyRegistry.getStrategy(type);

    if (!selectedType) {
      return [];
    }

    const items: SpeedDialItem[] = selectedType.getItems(markdownContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [type, markdownContext]);
}
