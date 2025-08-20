import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";
import {
  HallOfFameAction,
  HallOfFameActions,
} from "@/components/providers/hall-of-fame/types";

export function HallOfFameReducer(
  filters: HallOfFameFilter[],
  action: HallOfFameAction
) {
  switch (action.type) {
    case HallOfFameActions.OPEN_FILTER:
      return filters.map((filter) => {
        return {
          ...filter,
          isOpen: filter.id === action.payload.id ? !filter.isOpen : false,
        };
      });

    case HallOfFameActions.CLOSE_ALL_FILTERS:
      return filters.map((filter) => ({
        ...filter,
        isOpen: false,
      }));

    case HallOfFameActions.ADD_TO_FILTER:
      return filters.map((filter) => {
        if (filter.id !== action.payload.id) return filter;

        let updatedOptions;

        if (action.payload.value === "all") {
          updatedOptions = filter.options.map((option) => ({
            ...option,
            isSelected: option.value === "all",
          }));
        } else if (filter.maxSelections === 1) {
          updatedOptions = filter.options.map((option) => ({
            ...option,
            isSelected: option.value === action.payload.value,
          }));
        } else {
          updatedOptions = filter.options.map((option) => {
            if (option.value === action.payload.value) {
              return { ...option, isSelected: true };
            } else if (option.value === "all") {
              return { ...option, isSelected: false };
            }
            return option;
          });
        }

        return {
          ...filter,
          options: updatedOptions,
        };
      });

    case HallOfFameActions.REMOVE_FROM_FILTER:
      return filters.map((filter) => {
        if (filter.id !== action.payload.id) return filter;

        const updatedOptions = filter.options.map((option) =>
          option.value === action.payload.value
            ? { ...option, isSelected: false }
            : option
        );

        return {
          ...filter,
          options: updatedOptions,
        };
      });

    default:
      return filters;
  }
}
