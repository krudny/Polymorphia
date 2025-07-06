import {
  HallOfFameFilter,
  HallOfFameFilterOption,
} from "@/components/hall-of-fame/general/types";

export const addFieldToFilter = (
  { label, value, priority, isSelected }: HallOfFameFilterOption,
  filter: HallOfFameFilter
) => {
  const existingValues = new Set(
    filter.options.map((option: HallOfFameFilterOption) => option.value)
  );

  if (!existingValues.has(value)) {
    filter.options.push({
      label: label,
      value: value,
      priority: priority,
      isSelected: isSelected,
    });
  }
};
