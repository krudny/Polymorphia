import { useQuery } from "@tanstack/react-query";
import { FilterConfig } from "../../filters/types";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { CourseService } from "@/app/(logged-in)/course/CourseService";
import { EventSectionResponseDTO } from "@/interfaces/api/course";
import { HallOfFameFilterId } from "../types";

export function useHallOfFameFilterConfigs(courseId: number) {
  return useQuery({
    queryKey: ["hallOfFameFilters", courseId],
    queryFn: async (): Promise<FilterConfig<HallOfFameFilterId>[]> => {
      const [sections, groups] = await Promise.all([
        EventSectionService.getEventSections(courseId),
        CourseService.getCourseGroups(courseId),
      ]);

      console.log(groups);

      const configs: FilterConfig<HallOfFameFilterId>[] = [
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
            ...sections.map((s: EventSectionResponseDTO) => ({
              value: s.name,
            })),
            { value: "Bonusy" },
            { value: "total", label: "Suma" },
          ],
          defaultValues: ["total"],
        },
        {
          id: "groups",
          title: "Grupy",
          options: [
            { value: "all", label: "Wszystkie", specialBehavior: "EXCLUSIVE" },
            ...groups.map((g) => ({ value: g })),
          ],
          defaultValues: ["all"],
          max: 12,
        },
        {
          id: "rankingOptions",
          title: "Wyświetlanie",
          options: [
            ...sections.map((s) => ({
              value: s.name,
            })),
            { value: "Bonusy" },
          ],
          min: Math.min(4, sections.length),
          max: Math.min(4, sections.length),
          defaultValues: [
            ...sections
              .slice(0, Math.min(3, Math.max(0, sections.length - 1)))
              .map((s) => s.name),
            "Bonusy",
          ],
        },
      ];

      return configs;
    },
  }).data;
}
