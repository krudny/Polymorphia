import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";
import { getAllFilters } from "@/components/providers/hall-of-fame/utils/getAllFilters";

export const getAppliedQueryParams = (filtersState: HallOfFameFilter[]) => {
  const { sortFilter, sortByFilter, groupsFilter, rankingOptionsFilter } =
    getAllFilters(filtersState);

  const getSelectedValues = (filter: HallOfFameFilter): string[] => {
    const selectedOptions = filter.options.filter((opt) => opt.isSelected);
    return selectedOptions.map((opt) => opt.value);
  };

  return {
    sortOrder: getSelectedValues(sortFilter)[0],
    sortBy: getSelectedValues(sortByFilter)[0],
    groups: getSelectedValues(groupsFilter),
    rankingOptions: getSelectedValues(rankingOptionsFilter),
  };
};
