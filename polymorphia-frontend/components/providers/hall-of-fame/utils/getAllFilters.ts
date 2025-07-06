// TODO: null assertion, but I trust myself more than typescript
import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const getAllFilters = (filters: HallOfFameFilter[]) => {
  return {
    sortFilter: filters.find((filter) => filter.id === "sort")!,
    sortByFilter: filters.find((filter) => filter.id === "sortBy")!,
    groupsFilter: filters.find((filter) => filter.id === "groups")!,
    rankingOptionsFilter: filters.find(
      (filter) => filter.id === "rankingOptions"
    )!,
  };
};
