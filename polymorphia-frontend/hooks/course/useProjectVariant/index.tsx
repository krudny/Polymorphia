import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { UseProjectVariant } from "@/hooks/course/useProjectVariant/types";
import { useEventParams } from "@/hooks/general/useEventParams";

import { EventTypes } from "@/interfaces/general";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useProjectVariant(): UseProjectVariant {
  const { gradableEventId, eventType } = useEventParams();
  const { id: userId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectVariant", gradableEventId, userId],
    queryFn: () =>
      EventSectionService.getProjectVariant(userId, gradableEventId),
    enabled: !!gradableEventId && eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
