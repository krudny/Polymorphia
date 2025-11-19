"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import {
  CourseGroupsContextInterface,
  CourseGroupsFilterId,
} from "@/providers/course-groups/types";
import { useFilters } from "@/hooks/course/useFilters";
import useCourseGroupsFilterConfigs from "@/hooks/course/useCourseGroupsFilterConfigs";
import useStudentSummary from "@/hooks/course/useStudentSummary";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useStudentLastActivity from "@/hooks/course/useStudentLastActivity";
import {
  DEFAULT_SEARCH_BY,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER_ASC,
} from "@/shared/filter-defaults";

export const CourseGroupsContext = createContext<
  CourseGroupsContextInterface | undefined
>(undefined);

export const CourseGroupsProvider = ({ children }: { children: ReactNode }) => {
  const { targetId, applyFiltersCallback } = useTargetContext();
  const [gradableEventId, setGradableEventId] = useState<number | null>(null);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const filterConfigs = useCourseGroupsFilterConfigs();
  const filters = useFilters<CourseGroupsFilterId>(filterConfigs ?? []);
  const sortBy = useMemo(
    () => filters.getAppliedFilterValues("sortBy") ?? DEFAULT_SORT_BY,
    [filters]
  );
  const sortOrder = useMemo(
    () => filters.getAppliedFilterValues("sortOrder") ?? DEFAULT_SORT_ORDER_ASC,
    [filters]
  );
  const searchBy = useMemo(
    () => filters.getAppliedFilterValues("searchBy") ?? DEFAULT_SEARCH_BY,
    [filters]
  );

  useEffect(() => {
    applyFiltersCallback({
      sortBy: sortBy.map((value) => (value === "name" ? searchBy[0] : value)),
      sortOrder,
      searchBy,
    });
  }, [sortBy, sortOrder, searchBy, applyFiltersCallback]);

  const {
    data: studentSummary,
    isLoading: isStudentSummaryLoading,
    isError: isStudentSummaryError,
  } = useStudentSummary(targetId!);
  const {
    data: lastActivities,
    isLoading: isLastActivitiesLoading,
    isError: isLastActivitiesError,
  } = useStudentLastActivity(targetId!);

  return (
    <CourseGroupsContext.Provider
      value={{
        areFiltersOpen,
        setAreFiltersOpen,
        filters,
        gradableEventId,
        setGradableEventId,
        studentSummary,
        lastActivities,
        isSpecificDataLoading:
          isStudentSummaryLoading || isLastActivitiesLoading,
        isSpecificDataError: isStudentSummaryError || isLastActivitiesError,
      }}
    >
      {children}
    </CourseGroupsContext.Provider>
  );
};
