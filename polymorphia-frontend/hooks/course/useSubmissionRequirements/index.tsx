import { useEventParams } from "@/hooks/general/useEventParams";
import { EventSectionService } from "@/services/event-section";
import { useQuery } from "@tanstack/react-query";

export default function useSubmissionRequirements() {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["submissionRequirements", gradableEventId],
    queryFn: () =>
      EventSectionService.getSubmissionRequirements(gradableEventId),
  });

  return { data, isLoading, isError };
}
