import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilterConfig } from "../useFilters/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { UseProfileFilterConfigs } from "@/hooks/course/useProfileFilterConfigs/types";
import { ProfileFilterId } from "@/app/(logged-in)/profile/types";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";

export function useProfileFilterConfigs(): UseProfileFilterConfigs {
  const { courseId } = useUserDetails();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileFilters", courseId],
    queryFn: async (): Promise<FilterConfig<ProfileFilterId>[]> => {
      const eventSections = await queryClient.fetchQuery({
        queryKey: ["eventSections", courseId],
        queryFn: () => EventSectionService.getEventSections(courseId),
      });
      return [
        {
          id: "rankingOptions",
          title: "Wyświetlanie",
          options: [
            ...eventSections.map((eventSection) => ({
              value: eventSection.name,
            })),
            { value: "bonuses", label: "Bonusy" },
            { value: "total", label: "Suma" },
          ],
          min: Math.min(4, eventSections.length),
          max: Math.min(4, eventSections.length),
          defaultValues: [
            ...eventSections
              .slice(0, Math.min(2, Math.max(0, eventSections.length - 1)))
              .map((eventSection) => eventSection.name),
            "bonuses",
            "total",
          ],
        },
      ];
    },
  });

  return { data, isLoading, isError };
}
