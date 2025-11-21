import { useQuery } from "@tanstack/react-query";
import { UseShortGrade } from "@/hooks/course/useShortGrade/types";
import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";
import { useEventParams } from "@/hooks/general/useEventParams";
import { GradeService } from "@/services/grade";

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
          gradableEventId,
        ]
      : ["grade", "noTarget"],
    queryFn: () => GradeService.getShortGrade(target!, gradableEventId),
    enabled: !!gradableEventId && !!target,
  });

  return { data, isLoading, isError };
}
