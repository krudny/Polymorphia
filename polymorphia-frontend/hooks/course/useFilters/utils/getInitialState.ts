import { FilterConfig, FilterState } from "@/hooks/course/useFilters/types";

export function getInitialState<FilterIdType extends string>(
  configs: FilterConfig<FilterIdType>[]
): FilterState<FilterIdType> {
  return configs.reduce<FilterState<FilterIdType>>((acc, config) => {
    acc[config.id] = config.defaultValues ?? [];
    return acc;
  }, {} as FilterState<FilterIdType>);
}
