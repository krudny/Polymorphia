import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { useQuery } from "@tanstack/react-query";
import { FilterConfig } from "../useFilters/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { UseProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs/types";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";

export function useProfileFilterConfigs(): UseProfileFilterConfigs {
  const { courseId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileFilters", courseId],
    queryFn: async (): Promise<FilterConfig<ProfileFilterId>[]> => {
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
