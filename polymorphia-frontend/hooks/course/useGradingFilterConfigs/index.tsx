import {
  FilterConfig,
  SpecialBehaviors,
} from "@/hooks/course/useFilters/types";
import { GradingFilterId } from "@/providers/grading/types";
import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { CourseGroupTypes } from "@/services/course-groups/types";

export function useGradingFilterConfigs(courseId: number) {
  return useQuery({
    queryKey: ["gradingFilters", courseId],
    queryFn: async () => {
      const courseGroups = await CourseGroupsService.getCourseGroups(
        courseId,
        CourseGroupTypes.INDIVIDUAL_SHORT
      );

      const configs: FilterConfig<GradingFilterId>[] = [
        {
          id: "sortOrder",
          title: "Sortowanie",
          options: [
            { value: "desc", label: "Malejąco" },
            { value: "asc", label: "Rosnąco" },
          ],
          defaultValues: ["asc"],
        },
        {
          id: "sortBy",
          title: "Sortowanie po kategorii",
          options: [
            { value: "name", label: "Nazwa" },
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
          id: "gradeStatus",
          title: "Status oceny",
          options: [
            { value: "all", label: "Wszystkie" },
            { value: "ungraded", label: "Nieocenione" },
            { value: "graded", label: "Ocenione" },
          ],
          defaultValues: ["all"],
        },
      ];

      return configs;
    },
  });
}
