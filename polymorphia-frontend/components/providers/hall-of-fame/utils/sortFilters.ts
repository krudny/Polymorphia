import { HallOfFameFilter } from "@/components/hall-of-fame/general/types";

export const sortFilters = (filters: HallOfFameFilter[]) => {
  filters.forEach((filter) =>
    filter.options.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  );
};
