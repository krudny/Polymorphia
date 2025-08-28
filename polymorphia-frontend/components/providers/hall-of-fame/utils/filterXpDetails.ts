import { FilterConfig } from "../../filters/types";

export const filterXpDetails = <FilterIdType extends string>(
  xpDetails: Record<string, string>,
  filterConfig: FilterConfig<FilterIdType> | undefined,
  getAppliedFilterValues: (filterId: FilterIdType) => string[]
): Record<string, string> => {
  if (!filterConfig) {
    return {};
  }

  const selectedKeys = new Set(getAppliedFilterValues(filterConfig.id));

  return Object.fromEntries(
    Object.entries(xpDetails).filter(([key]) => selectedKeys.has(key))
  );
};
