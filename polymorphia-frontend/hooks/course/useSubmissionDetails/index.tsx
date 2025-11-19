import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";
import UseSubmissionDetails from "@/hooks/course/useSubmissionDetails/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { SubmissionService } from "@/services/submission";
import { EventTypes } from "@/interfaces/general";

export default function useSubmissionDetails(
  target: TargetRequestDTO | null
): UseSubmissionDetails {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "submissionDetails",
          gradableEventId,
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ]
      : ["submissionDetails", "noTarget"],
    queryFn: () =>
      SubmissionService.getSubmissionDetails(gradableEventId, target!),
    enabled: !!target && eventType !== EventTypes.TEST,
  });

  return { data, isLoading, isError };
}
