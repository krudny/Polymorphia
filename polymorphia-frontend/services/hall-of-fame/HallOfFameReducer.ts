import {
  HallOfFameAction,
  HallOfFameFilter,
} from "@/interfaces/hall-of-fame/HallOfFameLogicInterfaces";

export function HallOfFameReducer(
  filters: HallOfFameFilter[],
  action: HallOfFameAction
) {
  switch (action.type) {
    case "TOGGLE_SORT_ORDER":
      return filters.map((filter) => {
        if (filter.id !== action.payload.id) return filter;

        const updatedOptions = filter.options.map((option) => ({
          ...option,
          isSelected: !option.isSelected,
        }));

        return {
          ...filter,
          options: updatedOptions,
        };
      });

    case "CLOSE_ALL_CATEGORIES":
      return filters.map((filter) => ({
        ...filter,
        isOpen: false,
      }));

    case "ADD_CATEGORY_SELECTION":
      return filters.map((filter) => {
        if (filter.id !== action.payload.id) return filter;

        let updatedOptions;

        if (action.payload.value === "all") {
          updatedOptions = filter.options.map((option) => ({
            ...option,
            isSelected: option.value === "all",
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

    case "REMOVE_CATEGORY_SELECTION":
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
