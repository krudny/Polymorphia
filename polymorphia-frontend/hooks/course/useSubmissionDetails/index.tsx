import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";
import UseSubmissionDetails from "@/hooks/course/useSubmissionDetails/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useSubmissionDetails(
  target: TargetRequestDTO | null
): UseSubmissionDetails {
  const { courseId } = useUserDetails();
  const { eventSectionId, gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "submissionDetails",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ]
      : ["submissionDetails", "no-target"],
    queryFn: () =>
      EventSectionService.getSubmissionDetails(
        target!,
        courseId,
        eventSectionId,
        gradableEventId
      ),
    enabled: !!target,
  });

  return { data, isLoading, isError };
}
