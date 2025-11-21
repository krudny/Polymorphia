import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import {
  UseProjectVariant,
  UseProjectVariantProps,
} from "@/hooks/course/useProjectVariant/types";
import { useEventParams } from "@/hooks/general/useEventParams";

import { EventTypes } from "@/interfaces/general";

export default function useProjectVariant({
  target,
}: UseProjectVariantProps): UseProjectVariant {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? ["projectVariant", gradableEventId, target]
      : ["projectVariant", "noTarget"],
    queryFn: () => ProjectService.getProjectVariant(target!, gradableEventId),
    enabled:
      gradableEventId !== undefined &&
      gradableEventId !== null &&
      target !== null &&
      eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
