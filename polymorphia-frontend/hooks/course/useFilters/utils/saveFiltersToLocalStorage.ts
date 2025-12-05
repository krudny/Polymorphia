import { FilterState } from "@/hooks/course/useFilters/types";

export function saveFiltersToLocalStorage<FilterIdType extends string>(
  appliedState: FilterState<FilterIdType>,
  key: string
) {
  localStorage.setItem("filters_" + key, JSON.stringify(appliedState));
}
