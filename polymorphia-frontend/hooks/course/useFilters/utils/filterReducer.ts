import {
  FilterAction,
  FilterActions,
  FilterConfig,
  FilterState,
  SpecialBehaviors,
} from "../types";
import { getInitialState } from "./getInitialState";

export function filterReducer<FilterIdType extends string>(
  state: FilterState<FilterIdType>,
  action: FilterAction<FilterIdType>,
  configs: FilterConfig<FilterIdType>[]
): FilterState<FilterIdType> {
  switch (action.type) {
    case FilterActions.TOGGLE: {
      const current = state[action.id] ?? [];
      const config = configs.find((config) => config.id === action.id);
      if (!config) {
        return state;
      }

      const option = config.options.find(
        (option) => option.value === action.value
      );
      if (!option) {
        return state;
      }

      const min = config.min ?? 1;
      const max = config.max ?? 1;

      // Handle deselect
      const alreadySelected = current.includes(action.value);
      if (alreadySelected) {
        // Prevent deselecting all items if min === max === 1
        if (min === 1 && max === 1 && current.length <= 1) {
          return state;
        }

        return {
          ...state,
          [action.id]: current.filter((value) => value !== action.value),
        };
      }

      // Handle selection of special "EXCLUSIVE" option or when maximum one option is allowed
      if (option.specialBehavior === SpecialBehaviors.EXCLUSIVE || max === 1) {
        return { ...state, [action.id]: [option.value] };
      }

      // Handle selection of regular option
      const newValues = [
        // Deselct all "EXCLUSIVE" options
        ...current.filter((value) => {
          const optionDetails = config.options.find(
            (optionDetails) => optionDetails.value === value
          );
          return optionDetails?.specialBehavior !== SpecialBehaviors.EXCLUSIVE;
        }),
        option.value,
      ];

      return { ...state, [action.id]: newValues };
    }

    case FilterActions.SET:
      return action.state;

    case FilterActions.RESET:
      return getInitialState(configs);

    default:
      return state;
  }
}
