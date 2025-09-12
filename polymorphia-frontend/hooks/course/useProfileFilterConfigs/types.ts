import { FilterConfig } from "@/hooks/course/useFilters/types";
import { HallOfFameFilterId } from "@/providers/hall-of-fame/types";

export type UseProfileFilterConfigs = {
  data: FilterConfig<HallOfFameFilterId>[] | undefined;
  isLoading: boolean;
  isError: boolean;
};
