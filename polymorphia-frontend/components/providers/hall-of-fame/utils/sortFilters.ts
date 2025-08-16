import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const sortFilters = (filters: HallOfFameFilter[]) => {
  filters.forEach((filter) =>
    filter.options.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
  );
};
