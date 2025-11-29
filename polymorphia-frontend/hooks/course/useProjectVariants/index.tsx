import { useQuery } from "@tanstack/react-query";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/general";
import { ProjectService } from "@/services/project";

export function useProjectVariants(): UseProjectVariants {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectVariants", gradableEventId],
    queryFn: () => ProjectService.getProjectVariants(gradableEventId),
    enabled: eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
