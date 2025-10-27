import { Dispatch, SetStateAction } from "react";
import { useFilters } from "@/hooks/course/useFilters";

export interface CourseGroupsContextInterface {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  areFiltersOpen: boolean;
  setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
  filters: ReturnType<typeof useFilters<CourseGroupsFilterId>>;
  gradableEventId: number | null;
  setGradableEventId: Dispatch<SetStateAction<number | null>>;
}

export type CourseGroupsFilterId = "sortOrder" | "sortBy";
