"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  CourseGroupsContextInterface,
  CourseGroupsFilterId,
} from "@/providers/course-groups/types";
import { useFilters } from "@/hooks/course/useFilters";
import useCourseGroupsFilterConfigs from "@/hooks/course/useCourseGroupsFilterConfigs";
import useStudentSummary from "@/hooks/course/useStudentSummary";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useStudentLastActivity from "@/hooks/course/useStudentLastActivity";

export const CourseGroupsContext = createContext<
  CourseGroupsContextInterface | undefined
>(undefined);

export const CourseGroupsProvider = ({ children }: { children: ReactNode }) => {
  const { targetId, applyFiltersCallback } = useTargetContext();
  const [gradableEventId, setGradableEventId] = useState<number | null>(null);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const filterConfigs = useCourseGroupsFilterConfigs();
  const filters = useFilters<CourseGroupsFilterId>(filterConfigs ?? []);
  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];

  useEffect(() => {
    applyFiltersCallback({
      sortBy,
      sortOrder,
    });
  }, [sortBy, sortOrder]);

  const { data: studentSummary, isLoading: isStudentSummaryLoading } =
    useStudentSummary(targetId!);
  const { data: lastActivities, isLoading: isLastActivitiesLoading } =
    useStudentLastActivity(targetId!);

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
      }}
    >
      {children}
    </CourseGroupsContext.Provider>
  );
};
