import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseInstructorGradableEvents } from "@/hooks/course/useInstructorGradableEvents/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useInstructorGradableEvents(): UseInstructorGradableEvents {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () => EventSectionService.getInstructorGradableEvents(eventSectionId),
  });

  return { data, isLoading, isError };
}

