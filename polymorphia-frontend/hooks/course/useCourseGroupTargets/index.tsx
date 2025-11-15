import {
  UseCourseGroupTargets,
  UseCourseGroupTargetsParams,
} from "@/hooks/course/useCourseGroupTargets/types";
import { useQuery } from "@tanstack/react-query";
import TargetListService from "@/services/target-list";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useCourseGroupTargets(
  params: UseCourseGroupTargetsParams
): UseCourseGroupTargets {
  const { search = "", sortBy = [], sortOrder = [], searchBy = [] } = params;
  const { courseGroupId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
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

  return { data, isLoading, isError };
}
