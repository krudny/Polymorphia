import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { UseShortGrade } from "@/hooks/course/useShortGrade/types";
import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useShortGrade(
  target: TargetRequestDTO | null,
  gradableEventIdOverride?: number
): UseShortGrade {
  const { gradableEventId: paramsGradableEventId } = useEventParams();
  const gradableEventId =
    gradableEventIdOverride === undefined
      ? paramsGradableEventId
      : gradableEventIdOverride;

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "grade",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ]
      : ["grade", "noTarget"],
    queryFn: () => EventSectionService.getShortGrade(target!, gradableEventId),
    enabled: !!gradableEventId && !!target,
  });

  return { data, isLoading, isError };
}
