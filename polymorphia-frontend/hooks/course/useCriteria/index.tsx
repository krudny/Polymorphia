import { useQuery } from "@tanstack/react-query";
import { UseCriteria } from "@/hooks/course/useCriteria/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { CriteriaService } from "@/services/criteria";

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
    queryFn: () => CriteriaService.getCriteria(gradableEventId),
    staleTime: 1000 * 15,
  });

  return { data, isLoading, isError };
}
