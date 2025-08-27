import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { UseHallOfFame, useHallOfFameProps } from "@/hooks/course/useHallOfFame/types";

export default function useHallOfFame({
                                        page,
                                        pageSize,
                                        debouncedSearch,
                                        sortOrder,
                                        sortBy,
                                        groups,
                                      }: useHallOfFameProps): UseHallOfFame {
  const { data, isLoading } = useQuery({
    queryKey: [
      "hallOfFame",
      page,
      pageSize,
      debouncedSearch,
      sortOrder,
      sortBy,
      groups,
    ],
    queryFn: () =>
      HallOfFameService.getHallOfFame(
        page,
        pageSize,
        debouncedSearch,
        sortBy,
        sortOrder,
        groups,
      ),
  });

  return { data, isLoading };
}