import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";
import { QueryClient } from "@tanstack/query-core";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

export const hallOfFameConfirmAction = (
  filters: HallOfFameFilter[],
  setAppliedFiltersState: Dispatch<SetStateAction<HallOfFameFilter[]>>,
  queryClient: QueryClient
): boolean => {
  const invalidFilterCount = filters.find((filter) => {
    const selectedCount = filter.options.filter((opt) => opt.isSelected).length;
    return (
      selectedCount < filter.minSelections ||
      selectedCount > filter.maxSelections
    );
  });

  if (invalidFilterCount) {
    const { minSelections, maxSelections, name } = invalidFilterCount;

    const rangeText =
      minSelections === maxSelections
        ? minSelections
        : `od ${minSelections} do ${maxSelections}`;

    const optionText =
      maxSelections === 1 ? "opcję" : maxSelections < 5 ? "opcje" : "opcji";

    toast.error(
      `Musisz wybrać dla kategorii ${name.toLowerCase()} ${rangeText} ${optionText}.`
    );
    return false;
  }

  queryClient.invalidateQueries({
    queryKey: ["hallOfFame"],
  });

  setAppliedFiltersState([...filters]);

  return true;
};
