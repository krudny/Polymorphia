import { useQuery } from "@tanstack/react-query";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { EventSectionService } from "@/services/event-section";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/general";
import { UseProjectGroup } from "@/hooks/course/useProjectGroup/types";

export function useProjectGroup(): UseProjectGroup {
  const { gradableEventId, eventType } = useEventParams();
  const { id: userId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectGroup", gradableEventId, userId],
    queryFn: () => EventSectionService.getProjectGroup(userId, gradableEventId),
    enabled:
      gradableEventId !== undefined &&
      gradableEventId !== null &&
      eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
