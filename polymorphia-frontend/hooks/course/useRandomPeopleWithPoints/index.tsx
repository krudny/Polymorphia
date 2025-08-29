import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseRandomPeopleWithPoints } from "@/hooks/course/useRandomPeopleWithPoints/types";
import { EventTypes } from "@/interfaces/api/course";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useRandomPeopleWithPoints(
  debouncedSearch: string
): UseRandomPeopleWithPoints {
  const { eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students", debouncedSearch],
    queryFn: () =>
      EventSectionService.getRandomPeopleWithPoints(debouncedSearch),
    enabled: eventType !== EventTypes.PROJECT,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
