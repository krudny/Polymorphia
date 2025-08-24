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
      const [eventSections, courseGroups] = await Promise.all([
        EventSectionService.getEventSections(courseId),
        CourseService.getCourseGroups(courseId),
      ]);

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
            ...eventSections.map((eventSection: EventSectionResponseDTO) => ({
              value: eventSection.name,
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
            ...courseGroups.map((courseGroup) => ({ value: courseGroup })),
          ],
          defaultValues: ["all"],
          max: 12,
        },
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

      return configs;
    },
  });
}
