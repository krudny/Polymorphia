import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseStudentsGradableEvents } from "@/hooks/course/useStudentsGradableEvents/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useStudentsGradableEvents(): UseStudentsGradableEvents {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () => EventSectionService.getStudentGradableEvents(eventSectionId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
