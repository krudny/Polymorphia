import { FilterConfig } from "@/hooks/course/useFilters/types";
import { CourseGroupsFilterId } from "@/providers/course-groups/types";

export default function useCourseGroupsFilterConfigs(): FilterConfig<CourseGroupsFilterId>[] {
  return [
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
        { value: "student_name", label: "Student" },
        { value: "animal_name", label: "Zwierzak" },
        { value: "total", label: "Punkty" },
      ],
      defaultValues: ["total"],
    },
  ];
}
