import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/general";
import { SubmissionService } from "@/services/submission";
import { useQuery } from "@tanstack/react-query";

export default function useSubmissionRequirements() {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["submissionRequirements", gradableEventId],
    queryFn: () => SubmissionService.getSubmissionRequirements(gradableEventId),
    enabled: eventType !== EventTypes.TEST,
  });

  return { data, isLoading, isError };
}
