import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/services/hall-of-fame";
import {
  UseHallOfFame,
  useHallOfFameProps,
} from "@/hooks/course/useHallOfFame/types";
import useFetch from "@/hooks/general/useFetch";

export default function useHallOfFame({
  page,
  pageSize,
  courseId,
  debouncedSearch,
  searchBy,
  sortOrder,
  sortBy,
  groups,
}: useHallOfFameProps): UseHallOfFame {
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading } = useQuery({
    queryKey: [
      "hallOfFame",
      page,
      pageSize,
      courseId,
      debouncedSearch,
      searchBy,
      sortOrder,
      sortBy,
      groups,
    ],
    queryFn: () =>
      HallOfFameService.getHallOfFame(
        fetchFn,
        page,
        pageSize,
        courseId,
        debouncedSearch,
        searchBy,
        sortBy[0].length > 0 ? sortBy[0] : "total",
        sortOrder[0] === "asc" || sortOrder[0] === "desc"
          ? sortOrder[0]
          : "desc",
        groups[0] !== "all" ? groups : undefined
      ),
  });

  return { data, isLoading };
}
