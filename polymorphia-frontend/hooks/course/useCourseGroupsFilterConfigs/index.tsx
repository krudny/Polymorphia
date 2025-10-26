import { FilterConfig } from "@/hooks/course/useFilters/types";
import { CourseGroupsFilterId } from "@/providers/course-groups/types";
import { useMemo } from "react";

export default function useCourseGroupsFilterConfigs(): FilterConfig<CourseGroupsFilterId>[] {
  return useMemo(
    () => [
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
    ],
    []
  );
}
