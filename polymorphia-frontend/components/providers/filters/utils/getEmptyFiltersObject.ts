import { FilterState } from "../types";

export function getEmptyFiltersObject<FilterIdType extends string>() {
  return {
    configs: [],
    state: {} as FilterState<FilterIdType>,
    appliedState: {} as FilterState<FilterIdType>,
    dispatch: () => {},
    applyFilters: () => {
      return { ok: false };
    },
    getFilterValues: () => [],
    getAppliedFilterValues: () => [],
    resetFiltersToApplied: () => {},
    resetFiltersToInitial: () => {},
  };
}
