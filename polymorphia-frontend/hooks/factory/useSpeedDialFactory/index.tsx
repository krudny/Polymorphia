import {
  SpeedDialEventProps,
  SpeedDialItem,
} from "@/components/speed-dial/types";
import { useMemo } from "react";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategies/Registry";
import { useOptionalMarkdownContext } from "@/hooks/contexts/useMarkdownContext";
import { usePathname, useRouter } from "next/navigation";
import { SpeedDialContext } from "@/components/speed-dial/strategies/types";
import useUserContext from "@/hooks/contexts/useUserContext";

export function useSpeedDialFactory({
  speedDialKey,
}: SpeedDialEventProps): SpeedDialItem[] {
  const markdownContext = useOptionalMarkdownContext();
  const router = useRouter();
  const pathname = usePathname();
  const { userRole } = useUserContext();

  return useMemo(() => {
    if (!userRole) {
      return [];
    }

    const selectedType = speedDialStrategyRegistry.getStrategy(speedDialKey);

    if (!selectedType) {
      return [];
    }

    const combinedContext: SpeedDialContext = {
      router: router,
      role: userRole,
      currentPath: pathname,
      saveMarkdown: markdownContext?.saveMarkdown || (() => {}),
      setIsEditing: markdownContext?.setIsEditing || (() => {}),
      rejectMarkdown: markdownContext?.rejectMarkdown || (() => {}),
      markdownSource: markdownContext?.markdownSource?.sourceUrl,
      isEditing: markdownContext?.isEditing || false,
    };

    const items: SpeedDialItem[] = selectedType.getItems(combinedContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [speedDialKey, userRole, markdownContext, router, pathname]);
}
