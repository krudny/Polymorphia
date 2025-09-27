import { SpeedDialItem, SpeedDialProps } from "@/components/speed-dial/types";
import { useMemo } from "react";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategies/Registry";
import useUserRole from "@/hooks/general/useUserRole";

export function useSpeedDialFactory({
  speedDialKey,
}: SpeedDialProps): SpeedDialItem[] {
  const { data: role } = useUserRole();

  return useMemo(() => {
    if (!role) {
      return [];
    }

    const selectedType = speedDialStrategyRegistry.getStrategy(speedDialKey);

    if (!selectedType) {
      return [];
    }

    const items: SpeedDialItem[] = selectedType.getItems(role);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [speedDialKey, role]);
}
