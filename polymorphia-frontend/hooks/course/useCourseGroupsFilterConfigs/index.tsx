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
        defaultValues: ["desc"],
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
        id: "searchBy",
        title: "Nazwa studenta",
        options: [
          { value: "studentName", label: "Student" },
          { value: "animalName", label: "Zwierzak" },
        ],
        defaultValues: ["studentName"],
      },
    ],
    []
  );
}
