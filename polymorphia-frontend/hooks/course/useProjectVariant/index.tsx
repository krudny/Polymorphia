import { useQuery } from "@tanstack/react-query";
import { UseProjectVariant } from "@/hooks/course/useProjectVariant/types";
import { useEventParams } from "@/hooks/general/useEventParams";

import { EventTypes } from "@/interfaces/general";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { ProjectService } from "@/services/project";

export default function useProjectVariant(): UseProjectVariant {
  const { gradableEventId, eventType } = useEventParams();
  const { id: userId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectVariant", gradableEventId, userId],
    queryFn: () => ProjectService.getProjectVariant(userId, gradableEventId),
    enabled:
      gradableEventId !== undefined &&
      gradableEventId !== null &&
      eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
