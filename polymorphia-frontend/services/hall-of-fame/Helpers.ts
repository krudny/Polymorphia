import { EventSectionShortResponseDto } from "@/interfaces/course/event-section/EventSectionInterfaces";
import toast from "react-hot-toast";
import { QueryClient } from "@tanstack/query-core";
import {
  HallOfFameConfirmButtonType,
  HallOfFameFilter,
  HallOfFameFilterOption,
} from "@/interfaces/hall-of-fame/HallOfFameLogicInterfaces";

export const addEventSectionsToFilters = (
  eventSections: EventSectionShortResponseDto[],
  filter: HallOfFameFilter
) => {
  const existingValues = new Set(
    filter.options.map((option: HallOfFameFilterOption) => option.value)
  );

  eventSections?.forEach((eventSection: EventSectionShortResponseDto) => {
    if (!existingValues.has(eventSection.name)) {
      filter.options.push({
        label: eventSection.name,
        value: eventSection.name,
        priority: eventSection.priority,
        isSelected: false,
      });
      existingValues.add(eventSection.name);
    }
  });
};

// TODO: null assertion, but I trust myself more than typescript
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

export const confirmButtonAction = ({
  filters,
  setAppliedFiltersState,
}: HallOfFameConfirmButtonType): boolean => {
  const queryClient = new QueryClient();

  const invalidFilterCount = filters.find((filter) => {
    const selectedCount = filter.options.filter((opt) => opt.isSelected).length;
    return (
      selectedCount < filter.minSelections ||
      selectedCount > filter.maxSelections
    );
  });

  if (invalidFilterCount) {
    const { minSelections, maxSelections, name } = invalidFilterCount;

    const rangeText =
      minSelections === maxSelections
        ? minSelections
        : `od ${minSelections} do ${maxSelections}`;

    const optionText =
      maxSelections === 1 ? "opcję" : maxSelections < 5 ? "opcje" : "opcji";

    toast.error(
      `Musisz wybrać dla kategorii ${name.toLowerCase()} ${rangeText} ${optionText}.`
    );
    return false;
  }

  queryClient.invalidateQueries({
    queryKey: ["hallOfFame"],
  });

  setAppliedFiltersState([...filters]);

  return true;
};

export const getAppliedQueryParams = (filtersState: HallOfFameFilter[]) => {
  const { sortFilter, sortByFilter, groupsFilter, rankingOptionsFilter } =
    getAllFilters(filtersState);

  const getSelectedValues = (filter: HallOfFameFilter): string[] => {
    const selectedOptions = filter.options.filter((opt) => opt.isSelected);
    return selectedOptions.map((opt) => opt.value);
  };

  return {
    sortOrder: getSelectedValues(sortFilter),
    sortBy: getSelectedValues(sortByFilter),
    groups: getSelectedValues(groupsFilter),
    rankingOptions: getSelectedValues(rankingOptionsFilter),
  };
};
