import { useQuery } from "@tanstack/react-query";
import { UseInstructorGradableEvents } from "@/hooks/course/useInstructorGradableEvents/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { GradableEventService } from "@/services/gradable-event";

export default function useInstructorGradableEvents(): UseInstructorGradableEvents {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () =>
      GradableEventService.getInstructorGradableEvents(eventSectionId),
  });

  return { data, isLoading, isError };
}
