import { useReducer, useState, useEffect } from "react";
import {
  FilterConfig,
  FilterState,
  FilterAction,
  FilterActions,
} from "./types";
import { filterReducer } from "@/hooks/course/useFilters/utils/filterReducer";
import { getInitialState } from "@/hooks/course/useFilters/utils/getInitialState";
import { validateFilters } from "@/hooks/course/useFilters/utils/validateFilters";

export function useFilters<FilterIdType extends string>(
  configs: FilterConfig<FilterIdType>[]
) {
  const reducer = (
    state: FilterState<FilterIdType>,
    action: FilterAction<FilterIdType>
  ): FilterState<FilterIdType> => filterReducer(state, action, configs);

  const [state, dispatch] = useReducer(
    reducer,
    getInitialState<FilterIdType>(configs)
  );

  const [appliedState, setAppliedState] = useState<FilterState<FilterIdType>>(
    getInitialState(configs)
  );

  useEffect(() => {
    if (configs.length > 0) {
      dispatch({ type: FilterActions.RESET });
      setAppliedState(getInitialState<FilterIdType>(configs));
    }
  }, [configs]);

  const applyFilters = () => {
    const { valid, errors } = validateFilters(state, configs);
    if (valid) {
      setAppliedState(state);
      return { ok: true };
    }
    return { ok: false, errors };
  };

  const resetFiltersToApplied = () => {
    dispatch({ type: FilterActions.SET, state: appliedState });
  };

  const resetFiltersToInitial = () => {
    dispatch({ type: FilterActions.RESET });
    setAppliedState(getInitialState<FilterIdType>(configs));
  };

  const getFilterValues = (filterId: FilterIdType): string[] => {
    return state[filterId] || [];
  };

  const getAppliedFilterValues = (filterId: FilterIdType): string[] => {
    return appliedState[filterId] || [];
  };

  return {
    configs,
    state,
    appliedState,
    dispatch,
    getFilterValues,
    getAppliedFilterValues,
    applyFilters,
    resetFiltersToInitial,
    resetFiltersToApplied,
  };
}
