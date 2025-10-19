import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { UseEventSections } from "@/hooks/course/useEventSections/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useEventSections(): UseEventSections {
  const { courseId } = useUserDetails();
  const { data, isLoading, error } = useQuery({
    queryKey: ["eventSections", courseId],
    queryFn: () => EventSectionService.getEventSections(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
