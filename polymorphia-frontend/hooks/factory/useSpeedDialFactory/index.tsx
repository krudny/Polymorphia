import {SpeedDialItem, SpeedDialProps} from "@/components/speed-dial/types";
import {useMemo} from "react";
import {speedDialStrategyRegistry} from "@/components/speed-dial/strategies/Registry";
import {useOptionalMarkdownContext} from "@/hooks/contexts/useMarkdownContext";
import {usePathname, useRouter} from "next/navigation";
import {SpeedDialContext} from "@/components/speed-dial/strategies/types";
import useUserRole from "@/hooks/general/useUserRole";

export function useSpeedDialFactory({speedDialKey}: SpeedDialProps): SpeedDialItem[] {
  const markdownContext = useOptionalMarkdownContext();
  const router = useRouter();
  const pathname = usePathname();
  const { data: role } = useUserRole();

  return useMemo(() => {
    if (!role) {
      return [];
    }

    const selectedType = speedDialStrategyRegistry.getStrategy(speedDialKey)

    if (!selectedType) {
      return [];
    }

    const combinedContext: SpeedDialContext = {
      router: router,
      role: role,
      currentPath: pathname,
      saveMarkdown: markdownContext?.saveMarkdown || (() => {}),
      setIsEditing: markdownContext?.setIsEditing || (() => {}),
      rejectMarkdown: markdownContext?.rejectMarkdown || (() => {}),
      isEditing: markdownContext?.isEditing || false,
    };

    const items: SpeedDialItem[] = selectedType.getItems(combinedContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [speedDialKey, role, markdownContext, router, pathname]);
}
