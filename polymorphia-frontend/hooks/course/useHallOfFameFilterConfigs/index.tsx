import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";
import { EventSectionResponseDTO } from "@/interfaces/api/course";
import { useQuery } from "@tanstack/react-query";
import {
  FilterConfig,
  SpecialBehaviors,
} from "@/hooks/course/useFilters/types";
import { CourseGroupTypes } from "@/services/course-groups/types";
import useEventSections from "@/hooks/course/useEventSections";
import useCourseGroups from "@/hooks/course/useCourseGroups";

export function useHallOfFameFilterConfigs(courseId: number) {
  const { data: eventSections } = useEventSections();
  const { data: courseGroups } = useCourseGroups({
    courseId,
    type: CourseGroupTypes.ALL_SHORT,
  });

  return useQuery({
    queryKey: ["hallOfFameFilters", courseId],
    enabled: !!eventSections && !!courseGroups,
    queryFn: async (): Promise<FilterConfig<HallOfFameFilterId>[]> => {
      if (!eventSections || !courseGroups) {
        return [];
      }

      return [
        {
          id: "sortOrder",
          title: "Sortowanie",
          options: [
            { value: "desc", label: "Malejąco" },
            { value: "asc", label: "Rosnąco" },
          ],
          defaultValues: ["desc"],
        },
        {
          id: "sortBy",
          title: "Sortowanie po kategorii",
          options: [
            { value: "name", label: "Nazwa" },
            ...eventSections.map((eventSection: EventSectionResponseDTO) => ({
              value: eventSection.name,
            })),
            { value: "bonuses", label: "Bonusy" },
            { value: "total", label: "Suma" },
          ],
          defaultValues: ["total"],
        },
        {
          id: "groups",
          title: "Grupy",
          options: [
            {
              value: "all",
              label: "Wszystkie",
              specialBehavior: SpecialBehaviors.EXCLUSIVE,
            },
            ...courseGroups.map((courseGroup) => ({ value: courseGroup.name })),
          ],
          defaultValues: ["all"],
          max: courseGroups.length,
        },
        {
          id: "rankingOptions",
          title: "Wyświetlanie",
          options: [
            ...eventSections.map((eventSection) => ({
              value: eventSection.name,
            })),
            { value: "bonuses", label: "Bonusy" },
          ],
          min: Math.min(4, eventSections.length + 1),
          max: Math.min(4, eventSections.length + 1),
          defaultValues: [
            ...eventSections
              .slice(0, Math.min(3, eventSections.length))
              .map((eventSection) => eventSection.name),
            "bonuses",
          ],
        },
      ];
    },
  });
}
