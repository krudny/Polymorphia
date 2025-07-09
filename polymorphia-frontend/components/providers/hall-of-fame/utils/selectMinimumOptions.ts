import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const selectMinimumOptions = (filter: HallOfFameFilter) => {
  const selectedOptions = filter.options.filter((opt) => opt.isSelected);
  const notSelectedOptions = filter.options.filter((opt) => !opt.isSelected);

  if (selectedOptions.length < filter.minSelections) {
    const toAdd = Math.min(
      notSelectedOptions.length,
      filter.maxSelections - selectedOptions.length
    );
    for (let i = 0; i < toAdd; i++) {
      notSelectedOptions[i].isSelected = true;
    }
  }
};
