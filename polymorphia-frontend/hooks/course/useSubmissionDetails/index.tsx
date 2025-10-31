import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";
import UseSubmissionDetails from "@/hooks/course/useSubmissionDetails/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";

export default function useSubmissionDetails(
  target: TargetRequestDTO | null
): UseSubmissionDetails {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "submissionDetails",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ]
      : ["submissionDetails", "noTarget"],
    queryFn: () =>
      EventSectionService.getSubmissionDetails(gradableEventId, target!),
    enabled: !!target,
  });

  return { data, isLoading, isError };
}
