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
import { Roles } from "@/interfaces/api/user";

export function useSpeedDialFactory({
  eventType,
  viewType,
}: SpeedDialEventProps): SpeedDialItem[] {
  const markdownContext = useOptionalMarkdownContext();
  const router = useRouter();
  const pathname = usePathname();
  const { userType } = useUserContext();

  return useMemo(() => {
    if (userType === Roles.UNDEFINED) {
      return [];
    }

    const selectedType = speedDialStrategyRegistry.getStrategy(
      eventType,
      viewType,
      userType
    );

    if (!selectedType) {
      return [];
    }

    const combinedContext: SpeedDialContext = {
      router: router,
      role: userType,
      currentPath: pathname,
      saveMarkdown: markdownContext?.saveMarkdown || (() => {}),
      setIsEditing: markdownContext?.setIsEditing || (() => {}),
      rejectMarkdown: markdownContext?.rejectMarkdown || (() => {}),
      isEditing: markdownContext?.isEditing || false,
    };

    const items: SpeedDialItem[] = selectedType.getItems(combinedContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [eventType, viewType, userType, markdownContext, router, pathname]);
}
