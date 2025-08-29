import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseEventSections } from "./types";

const COURSE_ID = 1;

export default function useEventSections(): UseEventSections {
  const { data, isLoading, error } = useQuery({
    queryKey: ["eventSections", COURSE_ID],
    queryFn: () => EventSectionService.getEventSections(COURSE_ID),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
