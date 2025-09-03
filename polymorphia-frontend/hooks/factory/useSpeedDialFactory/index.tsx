import { SpeedDialItem, SpeedDialProps } from "@/components/speed-dial/types";
import { useMemo } from "react";
import { speedDialStrategyRegistry } from "@/components/speed-dial/strategies/Registry";
import { useOptionalMarkdownContext } from "@/hooks/contexts/useMarkdownContext";
import { usePathname, useRouter } from "next/navigation";
import { SpeedDialContext } from "@/components/speed-dial/strategies/types";

export function useSpeedDialFactory({
  eventType,
  viewType,
  role,
}: SpeedDialProps): SpeedDialItem[] {
  const markdownContext = useOptionalMarkdownContext();
  const router = useRouter();
  const pathname = usePathname();

  return useMemo(() => {
    const selectedType = speedDialStrategyRegistry.getStrategy(
      eventType,
      viewType,
      role
    );

    if (!selectedType) {
      return [];
    }

    const combinedContext: SpeedDialContext = {
      router: router,
      currentPath: pathname,
      saveMarkdown: markdownContext?.saveMarkdown || (() => {}),
      setIsEditing: markdownContext?.setIsEditing || (() => {}),
      rejectMarkdown: markdownContext?.rejectMarkdown || (() => {}),
      isEditing: markdownContext?.isEditing || false,
    };

    const items: SpeedDialItem[] = selectedType.getItems(combinedContext);
    return items.sort((a, b) => b.orderIndex - a.orderIndex);
  }, [eventType, viewType, role, markdownContext, router, pathname]);
}
