import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { UseProjectVariant } from "@/hooks/course/useProjectVariant/types";
import { useEventParams } from "@/hooks/general/useEventParams";

import { EventTypes } from "@/interfaces/general";

export default function useProjectVariant(): UseProjectVariant {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectVariant", gradableEventId],
    queryFn: () => EventSectionService.getProjectVariant(),
    enabled: !!gradableEventId && eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
