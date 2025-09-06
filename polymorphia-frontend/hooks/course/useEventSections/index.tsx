import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseEventSections } from "./types";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function useEventSections(): UseEventSections {
  const { courseId } = useUserContext().userDetails;
  const { data, isLoading, error } = useQuery({
    queryKey: ["eventSections", courseId],
    queryFn: () => EventSectionService.getEventSections(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
