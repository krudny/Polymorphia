import { SpeedDialItemDynamicBehavior } from "@/components/speed-dial/types";
import useProfileContext from "@/hooks/contexts/useProfileContext";

export function useProfileFiltersModalSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const { setAreFiltersOpen } = useProfileContext();

  return {
    onClick: () => setAreFiltersOpen(true),
  };
}
