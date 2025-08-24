import { FilterAction, FilterConfig, FilterState } from "../types";
import { getInitialState } from "./getInitialState";

export function filterReducer<FilterIdType extends string>(
  state: FilterState<FilterIdType>,
  action: FilterAction<FilterIdType>,
  configs: FilterConfig<FilterIdType>[]
): FilterState<FilterIdType> {
  switch (action.type) {
    case "TOGGLE": {
      const current = state[action.id] ?? [];
      const config = configs.find((c) => c.id === action.id);
      if (!config) return state;

      const option = config.options.find((o) => o.value === action.value);
      if (!option) return state;

      const alreadySelected = current.includes(action.value);

      if (alreadySelected) {
        return {
          ...state,
          [action.id]: current.filter((value) => value !== action.value),
        };
      }

      const min = config.min ?? 1;
      const max = config.max ?? 1;

      if (option.specialBehavior === "EXCLUSIVE" || (min === 1 && max === 1)) {
        return { ...state, [action.id]: [option.value] };
      }

      const newValues = [
        ...current.filter((value) => {
          const opt = config.options.find((o) => o.value === value);
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
