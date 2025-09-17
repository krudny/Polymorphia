import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import {
  TargetRequestDTO,
  UseShortGrade,
} from "@/hooks/course/useShortGrade/types";
import { TargetTypes } from "@/interfaces/api/grade";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useShortGrade(
  target: TargetRequestDTO | null
): UseShortGrade {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "grade",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ]
      : ["grade", "no-target"],
    queryFn: () => EventSectionService.getShortGrade(target!, gradableEventId),
    enabled: !!gradableEventId && !!target,
  });

  return { data, isLoading, isError };
}
