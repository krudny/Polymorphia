"use client";
import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  CourseGroupsContextInterface,
  CourseGroupsFilterId,
} from "@/providers/course-groups/types";
import { useFilters } from "@/hooks/course/useFilters";
import useCourseGroupsFilterConfigs from "@/hooks/course/useCourseGroupsFilterConfigs";

export const CourseGroupsContext = createContext<
  CourseGroupsContextInterface | undefined
>(undefined);

export const CourseGroupsProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [gradableEventId, setGradableEventId] = useState<number | null>(null);
  const [debouncedSearch] = useDebounce(search, 400);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const filterConfigs = useCourseGroupsFilterConfigs();
  const filters = useFilters<CourseGroupsFilterId>(filterConfigs ?? []);
  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];

  return (
    <CourseGroupsContext.Provider
      value={{
        search,
        setSearch,
        areFiltersOpen,
        setAreFiltersOpen,
        filters,
        gradableEventId,
        setGradableEventId,
      }}
    >
      {children}
    </CourseGroupsContext.Provider>
  );
};
