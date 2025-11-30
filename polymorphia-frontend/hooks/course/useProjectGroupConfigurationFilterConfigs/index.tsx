import { FilterConfig } from "@/hooks/course/useFilters/types";
import { useQuery } from "@tanstack/react-query";
import { TargetRequestDTO, TargetTypes } from "@/interfaces/api/target";
import { ProjectService } from "@/services/project";
import { ProjectGroupConfigurationFilterId } from "@/providers/project-group-configuration/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export function useProjectGroupConfigurationFilterConfigs(
  target: TargetRequestDTO | null
) {
  const { gradableEventId } = useEventParams();
  return useQuery({
    queryKey: target
      ? [
          "projectGroupConfigurationFilterConfigs",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          gradableEventId,
        ]
      : ["projectGroupConfigurationFilterConfigs", "noTarget"],
    queryFn: async () => {
      const groups =
        await ProjectService.getProjectGroupConfigurationFilterConfigs(
          target,
          gradableEventId
        );

      const configs: FilterConfig<ProjectGroupConfigurationFilterId>[] = [
        {
          ...groups,
          id: "groups",
          title: "Grupy",
        },
      ];

      return configs;
    },
  });
}
