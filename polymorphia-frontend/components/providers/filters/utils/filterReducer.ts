import { FilterAction, FilterConfig, FilterState } from "../types";
import { getInitialState } from "./getInitialState";

export function filterReducer(
  state: FilterState,
  action: FilterAction,
  configs: FilterConfig[]
): FilterState {
  switch (action.type) {
    case "TOGGLE": {
      const current = state[action.id] ?? [];
      const cfg = configs.find((c) => c.id === action.id);
      if (!cfg) return state;

      const option = cfg.options.find((o) => o.value === action.value);
      if (!option) return state;

      const alreadySelected = current.includes(action.value);

      if (alreadySelected) {
        return {
          ...state,
          [action.id]: current.filter((v) => v !== action.value),
        };
      }

      const min = cfg.min ?? 1;
      const max = cfg.max ?? 1;

      if (option.specialBehavior === "EXCLUSIVE" || (min === 1 && max === 1)) {
        return { ...state, [action.id]: [option.value] };
      }

      const newValues = [
        ...current.filter((v) => {
          const opt = cfg.options.find((o) => o.value === v);
          return opt?.specialBehavior !== "EXCLUSIVE";
        }),
        option.value,
      ];

      return { ...state, [action.id]: newValues };
    }

    case "SET":
      return action.state;

    case "RESET":
      return getInitialState(configs);

    default:
      return state;
  }
}
