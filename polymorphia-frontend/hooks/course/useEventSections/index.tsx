import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseEventSections } from "./types";
import { useContext } from "react";
import { UserContext } from "@/providers/user/UserContext";

export default function useEventSections(): UseEventSections {
  const { courseId } = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["eventSections", courseId],
    queryFn: () => EventSectionService.getEventSections(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
