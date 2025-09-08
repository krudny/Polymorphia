"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { useEventParams } from "@/hooks/general/useEventParams";
import useRandomPeopleWithPoints from "@/hooks/course/useRandomPeopleWithPoints";
import useProjectGroups from "@/hooks/course/useProjectGroups";
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import { EventTypes } from "@/interfaces/general";
import useGrade3 from "@/hooks/course/useGrade3";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import { GradingReducer, initialState } from "./gradingReducer";

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

const COURSE_ID = 1;

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId, eventType } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(COURSE_ID);

  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);
  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];

  //TODO: to be changed
  const selectedStudentId = state?.selectedTarget?.[0]?.id ?? null;
  const { data: students, isLoading: isStudentsLoading } =
    useRandomPeopleWithPoints(debouncedSearch, sortBy, sortOrder, groups);
  const { data: projectGroups, isLoading: isProjectGroupsLoading } =
    useProjectGroups(debouncedSearch);
  const { data: grade, isLoading: isGradeLoading } =
    useGrade3(selectedStudentId);
  const { mutate } = useGradeUpdate();

  useEffect(() => {
    if (eventType === EventTypes.PROJECT) {
      if (!projectGroups || projectGroups.length < 1) {
        return;
      }
      dispatch({
        type: GradingReducerActions.SET_TARGET,
        payload: projectGroups[0].members,
      });
    } else {
      if (!students || students.length < 1) {
        return;
      }
      dispatch({
        type: GradingReducerActions.SET_TARGET,
        payload: [students[0]],
      });
    }
  }, [students, projectGroups, eventType, dispatch]);
  // TODO: end of to be changed

  useEffect(() => {
    if (!grade) {
      return;
    }

    dispatch({
      type: GradingReducerActions.SET_GRADE,
      payload: {
        grade,
      },
    });
  }, [grade]);

  const submitGrade = () => {
    if (!selectedStudentId) {
      return;
    }

    mutate({
      studentId: selectedStudentId,
      gradableEventId,
      criteria: state.criteria,
      comment: state.comment,
    });
  };

  return (
    <GradingContext.Provider
      value={{
        areFiltersOpen,
        setAreFiltersOpen,
        isFiltersLoading,
        isFiltersError,
        filters,
        state,
        dispatch,
        search,
        setSearch,
        students,
        isStudentsLoading,
        projectGroups,
        isProjectGroupsLoading,
        isGradeLoading,
        submitGrade,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
