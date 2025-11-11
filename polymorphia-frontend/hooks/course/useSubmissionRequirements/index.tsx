import { useEventParams } from "@/hooks/general/useEventParams";
import { SubmissionService } from "@/services/submission";
import { useQuery } from "@tanstack/react-query";

export default function useSubmissionRequirements() {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["submissionRequirements", gradableEventId],
    queryFn: () => SubmissionService.getSubmissionRequirements(gradableEventId),
  });

  return { data, isLoading, isError };
}
