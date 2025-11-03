import { useEventParams } from "@/hooks/general/useEventParams";
import { UseTargets, UseTargetsParams } from "@/hooks/course/useTargets/types";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { EventTypes } from "@/interfaces/general";
import { TargetTypes } from "@/interfaces/api/target";

export default function useTargets(params: UseTargetsParams = {}): UseTargets {
  const { eventType, gradableEventId } = useEventParams();
  const {
    search = "",
    sortBy = [],
    sortOrder = [],
    groups = [],
    gradeStatus = [],
  } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["targets", search, sortBy, sortOrder, groups, gradeStatus],
    // TODO: really poor logic, but works
    queryFn: () =>
      EventSectionService.getRandomTargets(
        eventType === EventTypes.PROJECT
          ? TargetTypes.STUDENT_GROUP
          : TargetTypes.STUDENT,
        gradableEventId,
        sortBy,
        sortOrder,
        groups,
        gradeStatus
      ),
  });

  return { data, isLoading, isError };
}
