import { useReducer, useState, useEffect } from "react";
import { FilterConfig, FilterState, FilterAction } from "./types";
import { filterReducer } from "./utils/filterReducer";
import { getInitialState } from "./utils/getInitialState";
import { validateFilters } from "./utils/validateFilters";

export function useFilters(configs: FilterConfig[]) {
  const [state, dispatch] = useReducer(
    (s: FilterState, a: FilterAction) => filterReducer(s, a, configs),
    getInitialState(configs)
  );

  const [appliedState, setAppliedState] = useState<FilterState>(
    getInitialState(configs)
  );

  useEffect(() => {
    dispatch({ type: "RESET" });
    setAppliedState(getInitialState(configs));
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
    dispatch({ type: "SET", state: appliedState });
  };

  const resetFiltersToInitial = () => {
    dispatch({ type: "RESET" });
    setAppliedState(getInitialState(configs));
  };

  return {
    configs,
    state,
    appliedState,
    dispatch,
    applyFilters,
    resetFiltersToInitial,
    resetFiltersToApplied,
  };
}
