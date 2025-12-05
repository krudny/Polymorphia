import { useQuery } from "@tanstack/react-query";
import TargetListService from "@/services/target-list";
import { useEventParams } from "@/hooks/general/useEventParams";
import { UseTargets, UseTargetsParams } from "@/providers/target/types";

export default function useCourseGroupTargets(
  params: UseTargetsParams
): UseTargets {
  const { search = "", sortBy = [], sortOrder = [], searchBy = [] } = params;
  const { courseGroupId } = useEventParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courseGroupTargets", search, sortBy, sortOrder, searchBy],
    queryFn: () =>
      TargetListService.getCourseGroupTargetList(
        courseGroupId,
        search,
        searchBy[0],
        sortBy[0].length > 0 ? sortBy[0] : "total",
        sortOrder[0] === "asc" || sortOrder[0] === "desc"
          ? sortOrder[0]
          : "desc"
      ),
  });

  return { data, isLoading, isError, refetch };
}
