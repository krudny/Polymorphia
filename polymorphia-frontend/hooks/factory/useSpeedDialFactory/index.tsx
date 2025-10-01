import { SpeedDialItem, SpeedDialProps } from "@/components/speed-dial/types";
import { useMemo } from "react";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategies/Registry";
import useUserContext from "@/hooks/contexts/useUserContext";

export function useSpeedDialFactory({
  speedDialKey,
}: SpeedDialProps): SpeedDialItem[] {
  const { userRole } = useUserContext();

  return useMemo(() => {
    if (!userRole) {
      return [];
    }

    const selectedType = speedDialStrategyRegistry.getStrategy(speedDialKey);

    if (!selectedType) {
      return [];
    }

    const items: SpeedDialItem[] = selectedType.getItems(userRole);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [speedDialKey, userRole]);
}
