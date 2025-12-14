import { useQuery } from "@tanstack/react-query";
import { UseInstructorGradableEvents } from "@/hooks/course/gradable-event/useInstructorGradableEvents/types";
import { useEventParams } from "@/hooks/app/params/useEventParams";
import { GradableEventService } from "@/services/gradable-event";

export default function useInstructorGradableEvents(): UseInstructorGradableEvents {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["instructorGradableEvents", eventSectionId],
    queryFn: () =>
      GradableEventService.getInstructorGradableEvents(eventSectionId),
    staleTime: 1000 * 30,
  });

  return { data, isLoading, isError };
}
