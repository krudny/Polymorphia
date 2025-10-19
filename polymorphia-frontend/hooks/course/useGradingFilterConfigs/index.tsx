import {
  FilterConfig,
  SpecialBehaviors,
} from "@/hooks/course/useFilters/types";
import { GradingFilterId } from "@/providers/grading/types";
import { useQuery } from "@tanstack/react-query";
import { CourseService } from "@/services/course";

export function useGradingFilterConfigs(courseId: number) {
  return useQuery({
    queryKey: ["gradingFilters", courseId],
    queryFn: async () => {
      const courseGroups = await CourseService.getCourseGroups(courseId);

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
      ];

      return configs;
    },
  });
}
