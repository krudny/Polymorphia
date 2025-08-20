import { SpeedDialItem, SpeedDialProps } from "@/components/speed-dial/types";
import { useContext, useMemo } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategy/registry";

export function useSpeedDialItemsFactory({
  strategy,
}: SpeedDialProps): SpeedDialItem[] {
  const markdownContext = useContext(MarkdownContext);

  return useMemo(() => {
    const selectedStrategy = speedDialStrategyRegistry.getStrategy(strategy);

    if (!selectedStrategy) {
      return [];
    }

    const items: SpeedDialItem[] = selectedStrategy.getItems(markdownContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [strategy, markdownContext]);
}
