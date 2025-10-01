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
import useGradeUpdate from "@/hooks/course/useGradeUpdate";
import {
  GradingContextInterface,
  GradingFilterId,
} from "@/providers/grading/types";
import { useFilters } from "@/hooks/course/useFilters";
import { useGradingFilterConfigs } from "@/hooks/course/useGradingFilterConfigs";
import { GradingReducerActions } from "@/providers/grading/gradingReducer/types";
import { GradingReducer, initialState } from "./gradingReducer";
import useGradingTargets from "@/hooks/course/useGradingTargets";
import useShortGrade from "@/hooks/course/useShortGrade";
import { getRequestTargetFromResponseTarget } from "./utils/getRequestTargetFromResponseTarget";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export const GradingContext = createContext<
  GradingContextInterface | undefined
>(undefined);

export const GradingProvider = ({ children }: { children: ReactNode }) => {
  const { gradableEventId } = useEventParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  // TODO: changing target doesnt reset state
  const [state, dispatch] = useReducer(GradingReducer, initialState);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  const { courseId } = useUserDetails();

  const {
    data: filterConfigs,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useGradingFilterConfigs(courseId);
  const filters = useFilters<GradingFilterId>(filterConfigs ?? []);
  const sortBy = filters.getAppliedFilterValues("sortBy") ?? ["total"];
  const sortOrder = filters.getAppliedFilterValues("sortOrder") ?? ["asc"];
  const groups = filters.getAppliedFilterValues("groups") ?? ["all"];

  const { data: targets, isLoading: isTargetsLoading } = useGradingTargets(
    debouncedSearch,
    sortBy,
    sortOrder,
    groups
  );
  const { data: grade, isLoading: isGradeLoading } = useShortGrade(
    state.selectedTarget
  );
  const { mutate } = useGradeUpdate();

  useEffect(() => {
    if (!targets || targets.length < 1) {
      return;
    }
    dispatch({
      type: GradingReducerActions.SET_TARGET,
      payload: targets[0],
    });
  }, [targets, dispatch]);

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
    if (!state.selectedTarget) {
      return;
    }

    mutate({
      target: getRequestTargetFromResponseTarget(state.selectedTarget),
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
        targets,
        isTargetsLoading,
        isGradeLoading,
        submitGrade,
      }}
    >
      {children}
    </GradingContext.Provider>
  );
};
