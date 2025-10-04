import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { useEventParams } from "@/hooks/general/useEventParams";
import { UseGradingTargets } from "./types";
import { EventTypes } from "@/interfaces/general";
import { TargetTypes } from "@/interfaces/api/grade/target";

export default function useGradingTargets(
  debouncedSearch: string,
  sortBy: string[],
  sortOrder: string[],
  groups: string[]
): UseGradingTargets {
  const { eventType, gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradingTargets", debouncedSearch],
    queryFn: () =>
      EventSectionService.getRandomTargets(
        eventType === EventTypes.PROJECT
          ? TargetTypes.STUDENT_GROUP
          : TargetTypes.STUDENT,
        gradableEventId,
        sortBy,
        sortOrder,
        groups
      ),
  });

  return { data, isLoading, isError };
}
