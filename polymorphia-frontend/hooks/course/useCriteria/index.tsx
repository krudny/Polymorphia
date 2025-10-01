import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseCriteria } from "@/hooks/course/useCriteria/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useCriteria(
  gradableEventIdOverride?: number
): UseCriteria {
  const { gradableEventId: paramsGradableEventId } = useEventParams();
  const gradableEventId =
    gradableEventIdOverride === undefined
      ? paramsGradableEventId
      : gradableEventIdOverride;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["criteria", gradableEventId],
    queryFn: () => EventSectionService.getCriteria(gradableEventId),
  });

  return { data, isLoading, isError };
}
