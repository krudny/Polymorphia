import {
  FilterConfig,
  SpecialBehaviors,
} from "@/hooks/course/useFilters/types";
import { GradingFilterId } from "@/providers/grading/types";
import { useQuery } from "@tanstack/react-query";
import TargetListService from "@/services/target-list";

export function useGradingFilterConfigs(gradableEventId: number) {
  return useQuery({
    queryKey: ["gradingFilters", gradableEventId],
    queryFn: async () => {
      const groups =
        await TargetListService.getGroupsForGradingFilters(gradableEventId);

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
            ...groups.map((group) =>
              group === "assigned"
                ? { value: "assigned", label: "Własne" }
                : { value: group }
            ),
          ],
          defaultValues: ["all"],
          max: groups.length,
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
