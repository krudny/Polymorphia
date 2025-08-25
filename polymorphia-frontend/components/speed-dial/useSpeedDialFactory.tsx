import { SpeedDialItem, SpeedDialProps } from "@/components/speed-dial/types";
import { useContext, useMemo } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategy/Registry";

export function useSpeedDialFactory({
                                      type,
                                    }: SpeedDialProps): SpeedDialItem[] {
  const markdownContext = useContext(MarkdownContext);

  return useMemo(() => {
    const selectedType = speedDialStrategyRegistry.getStrategy(type);

    if (!selectedType) {
      return [];
    }

    const items: SpeedDialItem[] = selectedType.getItems(markdownContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [type, markdownContext]);
}
