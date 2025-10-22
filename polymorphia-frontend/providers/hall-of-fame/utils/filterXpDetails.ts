import { FilterConfig, FilterOption } from "@/hooks/course/useFilters/types";

export const filterXpDetails = <FilterIdType extends string>(
  xpDetails: Record<string, string>,
  filterConfig: FilterConfig<FilterIdType> | undefined,
  getAppliedFilterValues: (filterId: FilterIdType) => string[]
): Record<string, string> => {
  if (!filterConfig) {
    return {};
  }

  const selectedOptions = getAppliedFilterValues(filterConfig.id)
    .map((key) => filterConfig.options.find((opt) => opt.value === key))
    .filter((opt): opt is FilterOption => !!opt);

  return selectedOptions
    .filter((opt) => xpDetails.hasOwnProperty(opt.value))
    .reduce(
      (acc, opt) => {
        acc[opt.label ?? opt.value] = xpDetails[opt.value];
        return acc;
      },
      {} as Record<string, string>
    );
};
