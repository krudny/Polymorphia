import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";
import { useQuery } from "@tanstack/react-query";
import { FilterConfig } from "../useFilters/types";
import useUserContext from "@/hooks/contexts/useUserContext";

export function useProfileFilterConfigs() {
  const { courseId } = useUserContext().userDetails;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileFilters", courseId],
    queryFn: async (): Promise<FilterConfig<HallOfFameFilterId>[]> => {
      const eventSections =
        await EventSectionService.getEventSections(courseId);
      return [
        {
          id: "rankingOptions",
          title: "Wyświetlanie",
          options: [
            ...eventSections.map((eventSection) => ({
              value: eventSection.name,
            })),
            { value: "Bonusy" },
          ],
          min: Math.min(4, eventSections.length),
          max: Math.min(4, eventSections.length),
          defaultValues: [
            ...eventSections
              .slice(0, Math.min(3, Math.max(0, eventSections.length - 1)))
              .map((eventSection) => eventSection.name),
            "Bonusy",
          ],
        },
      ];
    },
  });

  return { data, isLoading, isError };
}
