"use client";
import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  CourseGroupsContextInterface,
  CourseGroupsFilterId,
} from "@/providers/course-groups/types";
import { useFilters } from "@/hooks/course/useFilters";
import useCourseGroupsFilterConfigs from "@/hooks/course/useCourseGroupsFilterConfigs";
import useStudentSummary from "@/hooks/course/useStudentSummary";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import { TargetTypes } from "@/interfaces/api/target";
import useStudentLastActivity from "@/hooks/course/useStudentLastActivity";

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

  const { state: targetState } = useTargetContext();

  const targetId =
    targetState.selectedTarget?.type === TargetTypes.STUDENT
      ? targetState.selectedTarget.id
      : null;

  const { data: studentSummary, isLoading: isStudentSummaryLoading } =
    useStudentSummary(targetId!);
  const { data: lastActivities, isLoading: isLastActivitiesLoading } =
    useStudentLastActivity(targetId!);

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
