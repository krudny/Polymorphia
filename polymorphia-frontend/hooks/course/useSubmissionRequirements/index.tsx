import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventSectionService } from "@/services/event-section";
import { useQuery } from "@tanstack/react-query";

export default function useSubmissionRequirements() {
  const { eventSectionId, gradableEventId } = useEventParams();
  const { courseId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["submissionRequirements", eventSectionId, gradableEventId],
    queryFn: () =>
      EventSectionService.getSubmissionRequirements(
        courseId,
        eventSectionId,
        gradableEventId
      ),
  });

  return { data, isLoading, isError };
}
